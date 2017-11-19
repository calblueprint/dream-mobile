import React from 'react';
import { Button, Text, View, ScrollView, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

import { commonStyles } from '../../styles/styles';
import { textStyles } from '../../styles/textStyles';
import { APIRoutes } from '../../config/routes';
import settings from '../../config/settings';
import { getRequest, postRequest, putRequest } from '../../lib/requests';
import { attendanceDate } from '../../lib/date';
import AttendanceCard from '../../components/AttendanceCard';
import SimpleModal from '../../components/SimpleModal';
import { standardError } from '../../lib/request_callbacks';
import StyledButton from '../../components/Button/Button';

class AttendanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendances: { },
      students: { },
      isLoading: true,
      date: this.props.navigation.state.params.date,
      courseId: this.props.navigation.state.params.courseId,
      courseTitle: this.props.navigation.state.params.courseTitle,
      modalIndex: -1,
      modalComment: null,
    }

    this._saveComment = this._saveComment.bind(this);
  }

  componentDidMount() {
    this._fetchStudents(this.state.courseId);
  }

  /**
    * Fetches all students with the given course id and on success
    * gets attendances for each student
    */
  _fetchStudents(courseId) {
    const successFunc = (responseData) => {
      this.setState({ students: responseData });
      this._fetchAttendances(responseData);
    }
    getRequest(APIRoutes.getStudentsPath(courseId), successFunc, standardError);
  }

  /**
    * Attempts to get attendance for each students and waits for each request to succeed
    * before setting state for attendances, or logs failure
    */
  _fetchAttendances(students) {
    const attendances = students.map((student) => {
      return this._fetchAttendance(student.id, this.state.date);
    });

    Promise.all(attendances).then((attendances) => {
      this.setState({ attendances: attendances, isLoading: false })
    }).catch((error) => {
      console.log(error);
    });
  }


  /**
    * Makes a request to get attendance for the specified student
    */
  _fetchAttendance(studentId, date) {
    const successFunc = (responseData) => {
      return responseData;
    }
    const errorFunc = (error) => {
      // TODO (Kelsey): address what happens when attendance for student on given date doesn't exist
      console.log(error)
    }
    const params = {
      attendance: {
        student_id: studentId,
        date: date,
        course_id: this.state.courseId
      }
    }
    return postRequest(APIRoutes.attendanceItemPath(), successFunc, errorFunc, params);
  }

  /**
    * Gets students full name at the given index (assumes attendance index is same as student index)
    */
  _getStudentName(index) {
    const student = this.state.students[index]
    if (student) {
      return `${student.first_name} ${student.last_name}`
    }
  }

  /**
    * Sets state for modalComment to the given comment
    */
  _setComment(comment) {
    this.setState({ modalComment: comment });
  }

  /**
    * Updates comment for the attendance at the given index when save button is pressed
    * in comment modal.
    */
  _saveComment(index, comment) {
    const attendances = this.state.attendances;
    const attendance = this.state.attendances[index];
    attendance.comment = comment;
    attendance.isChanged = true;
    attendances[index] = attendance;
    this.setState({ attendances: attendances });
  }

  /**
    * Method passed to AttendanceCard to update attendance type for the attendance at the given index.
    * Takes in an index and returns a function that takes in a value and label (for Dropdown option).
    */
  _setType(index) {
    return (value, label) => {
      const attendances = this.state.attendances;
      const attendance = this.state.attendances[index];
      attendance.attendance_type = value;
      attendance.isChanged = true;
      attendances[index] = attendance;
      this.setState({ attendances: attendances });
    }
  }

  /**
    * Sets the comment modal's modalIndex (either to certain attendance's index or -1
    * if modal isn't open) and sets the comment text as the given comment (null if modal isn't open)
    */
  _setModal(index, comment) {
    this.setState({
      modalIndex: index,
      modalComment: comment
    });
  }

  /**
    * Renders AttendanceCard for each attendance object
    */
  _renderAttendances() {
    return this.state.attendances.map((attendance, i) => {
      return(
        <AttendanceCard key={i}
          attendance={attendance}
          index={i}
          name={this._getStudentName(i)}
          setModal={this._setModal.bind(this)}
          setType={this._setType.bind(this)} />
      );
    });
  }

  /**
    * Renders comment modal (if modalIndex is not -1) for attendance at modalIndex.
    *
    * If cancel is pressed, any changes to the attendance's comment will not be
    * saved and the modal is closed.
    * If save is pressed, changes to the comment will be saved and the modal is closed.
    */
  _renderModal() {
    const cancelCallback = () => {
      this._setModal(-1, null);
    }
    const saveCallback = () => {
      this._setModal(-1, null);
      this._saveComment(this.state.modalIndex, this.state.modalComment);
    };
    const buttons = [{ title: 'Save', callback: saveCallback, type: 'primary'},{title: 'Cancel', callback: cancelCallback, type: 'secondary'}]
    if (this.state.modalIndex !== -1) {
      return (
        <SimpleModal
          onClosed={cancelCallback}
          title={this._getStudentName(this.state.modalIndex)}
          buttons={buttons}
          visible={this.state.modalIndex !== -1}>
          <View>
            <TextInput
                style={{height: 40}}
                onChangeText={this._setComment.bind(this)}
                value={this.state.modalComment}
                placeholder='Add a note...'
              />
          </View>
        </SimpleModal>
      )
    }
  }

  /**
    * Renders date, course title, attendance cards, and submit button
    */
  _renderLoadedView() {
    const { navigate } = this.props.navigation;

    return(
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.attendancesContainer}>
            <View style={commonStyles.header}>
              <Text style={textStyles.titleSmall}>{attendanceDate(this.state.date)}</Text>
              <Text style={textStyles.titleLarge}>{this.state.courseTitle}</Text>
            </View>
            {this._renderAttendances()}
          </View>
        </ScrollView>
        <StyledButton
          onPress={() => navigate('AttendanceSummary', {
            attendances: this.state.attendances,
            students: this.state.students,
            courseTitle: this.state.courseTitle,
            date: this.state.date,
            parentKey: this.props.navigation.state.key,
          })}
          text='Submit'
          primaryButtonLarge
        >
        </StyledButton>
        {this._renderModal()}
      </View>
    )
  }

  /**
    * Renders loading state if data is still loading or uses _renderLoadedView
    */
  render() {
    // TODO (Kelsey): Add loading gif
    const attendances = this.state.isLoading ? (<Text>Loading...</Text>) : this._renderLoadedView();
    return (
      <View style={styles.container}>
        { attendances }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: '100%'
  },
  // Either change styles or generalize to AttendanceSummaryScreen too
  attendancesContainer: {
    marginRight: 16,
    marginLeft: 24,
  },
});
// TODO (Kelsey): Add PropTypes from navigation

export default AttendanceScreen;
