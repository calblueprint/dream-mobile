import React from 'react';
import { Image, Button, Text, View, ScrollView, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { commonStyles } from '../../styles/styles';
import { textStyles } from '../../styles/textStyles';
import { APIRoutes } from '../../config/routes';
import settings from '../../config/settings';
import { getRequest, postRequestNoCatch } from '../../lib/requests';
import AttendanceCard from '../../components/AttendanceCard';
import SimpleModal from '../../components/SimpleModal';
import { standardError } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';

class AttendanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Keep state for attendances since they shouldn't be updated to store
      // until user has reviewed the AttendanceSummaryScreen and submitted
      attendances: this.props.attendances ? this.props.attendances : [],
      modalIndex: -1,
      modalComment: null,
    }

    this._saveComment = this._saveComment.bind(this);
  }

  componentDidMount() {
    this.props.fetchStudents(this.props.courseId, this.props.date);
  }

  /**
    * Update attendances after dispatching a network call for them
    */
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ attendances: nextProps.attendances });
    }
  }

  /**
    * Gets students full name at the given index (assumes attendance index is same as student index)
    */
  _getStudentName(index) {
    const student = this.props.students[index]
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
      <View style={commonStyles.containerStatic}>
        <ScrollView>
          <View style={styles.attendancesContainer}>
            <View style={commonStyles.header}>
              <Text style={textStyles.titleSmall}>{this.props.date}</Text>
              <Text style={textStyles.titleLarge}>{this.props.courseTitle}</Text>
            </View>
            {this._renderAttendances()}
          </View>
        </ScrollView>
        <StyledButton
          onPress={() => navigate('AttendanceSummary', {
            attendances: this.state.attendances,
            students: this.props.students,
            courseTitle: this.props.courseTitle,
            date: this.props.date,
            parentKey: this.props.navigation.state.key,
            courseId: this.props.courseId,
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
    const attendances = this.props.isLoading ? (<Image style={commonStyles.icon}
                        source={require('../../icons/spinner.gif')}/>) : this._renderLoadedView();
    return (
      <View style={commonStyles.containerStatic}>
        { attendances }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Either change styles or generalize to AttendanceSummaryScreen too
  attendancesContainer: {
    marginRight: 16,
    marginLeft: 24,
  },
});
// TODO (Kelsey): Add PropTypes from navigation


/**
  * Fetches all students with the given course id and on success
  * gets attendances for each student
  */
const fetchStudents = (courseId, date) => {
  return (dispatch) => {
    dispatch(actions.requestStudents(courseId));
    return getRequest(
      APIRoutes.getStudentsPath(courseId),
      (responseData) => {
        dispatch(actions.receiveStudentsSuccess(responseData, courseId));
        dispatch(fetchAttendances(responseData, courseId, date));
      },
      (error) => {
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      }
    );
  }
}

/**
  * Attempts to get attendance for each students and waits for each request to succeed
  * before updating state for attendances
  */
const fetchAttendances = (students, courseId, date) => {
  return (dispatch) => {
    dispatch(actions.requestAttendances(courseId, date));
    const attendances = students.map((student) => {
      return fetchAttendance(student.id, courseId, date);
    });

    Promise.all(attendances).then((attendances) => {
      dispatch(actions.receiveAttendancesSuccess(attendances, courseId, date));
    }).catch((error) => {
      dispatch(actions.receiveStandardError(error));
      standardError(error);
    });
  }
}

/**
  * Makes a request to get attendance for the specified student.
  * (Uses postRequestNoCatch so any errors get caught in Promise.all)
  */
const fetchAttendance = (studentId, courseId, date) => {
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
      course_id: courseId
    }
  }
  return postRequestNoCatch(APIRoutes.attendanceItemPath(), successFunc, errorFunc, params);
}

const mapStateToProps = (state, props) => {
  // Get course and date associated with this attendance screen
  const course = state.courses.find((course) => course.id === props.navigation.state.params.courseId);
  const date = props.navigation.state.params.date;
  return {
    ...props.navigation.state.params,
    students: course.students ? course.students : {},
    attendances: course.attendances && course.attendances[date] ? course.attendances[date].list : [],
    isLoading: state.isLoading.value,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (courseId, date) => dispatch(fetchStudents(courseId, date)),
    fetchAttendances: (students, courseId, date) => dispatch(fetchAttendances(students, courseId, date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceScreen);
