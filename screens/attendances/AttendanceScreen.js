import React from 'react';
import { Button, Text, View, ScrollView, TextInput, TouchableHighlight } from 'react-native';

import { commonStyles } from '../../styles/styles';
import { APIRoutes } from '../../config/routes';
import settings from '../../config/settings';
import { getRequest, postRequest, putRequest } from '../../lib/requests';
import { attendanceDate } from '../../lib/date';
import AttendanceCard from '../../components/AttendanceCard';
import SimpleModal from '../../components/SimpleModal';

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
      modalVisible: false,
      modalIndex: -1,
    }

    this._setComment = this._setComment.bind(this)
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
    const errorFunc = (error) => {
      console.log(error)
    }
    getRequest(APIRoutes.getStudentsPath(courseId), successFunc, errorFunc);
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
    * Attempts to update each changed attendance and waits for each request to succeed
    * before navigating backwards or logging failure
    */
  _submitAttendances() {
    const attendances = this.state.attendances.map((attendance, i) => {
      return this._submitAttendance(attendance, i);
    });

    Promise.all(attendances).then((attendances) => {
      this.props.navigation.goBack();
    }).catch((error) => {
      console.log(error);
    });
  }

  /**
    * Makes put request to update given attendance if it has been changed
    */
  _submitAttendance(attendance, index) {
    const successFunc = (responseData) => {
      return responseData;
    }
    const errorFunc = (error) => {
      // TODO (Kelsey): address what happens when editing attendance fails
      console.log(error);
    }
    const params = attendance

    if (attendance.isChanged) {
      return putRequest(APIRoutes.attendancePath(), successFunc, errorFunc, params);
    }
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
    * Method passed to AttendanceCard to update comment for the attendance at the given index.
    * Takes in an index and returns a function that takes in a comment.
    */
  _setComment(index) {
    return (comment) => {
      const attendances = this.state.attendances
      const attendance = this.state.attendances[index]
      attendance.comment = comment
      attendance.isChanged = true
      attendances[index] = attendance
      this.setState({ attendances: attendances })
    }
  }

  /**
    * Method passed to AttendanceCard to update attendance type for the attendance at the given index.
    * Takes in an index and returns a function that takes in a value and label (for Dropdown option).
    */
  _setType(index) {
    return (value, label) => {
      const attendances = this.state.attendances
      const attendance = this.state.attendances[index]
      attendance.attendance_type = value
      attendance.isChanged = true
      attendances[index] = attendance
      this.setState({ attendances: attendances })
    }
  }

  _setModal(visible, index) {
    this.setState({ modalVisible: visible, modalIndex: index });
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

  _renderModal() {
    if (this.state.modalIndex !== -1) {
      return (
        <SimpleModal
          visible={this.state.modalVisible}
          >
          <View style={{marginTop: 22}}>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={this._setComment(this.state.modalIndex)}
                value={this.state.attendances[this.state.modalIndex].comment}
              />
            <TouchableHighlight onPress={() => {
              this._setModal(!this.state.modalVisible, -1)
            }}>
              <Text>Save</Text>
            </TouchableHighlight>
          </View>
        </SimpleModal>
      )
    }
  }

  /**
    * Renders date, course title, attendance cards, and submit button
    */
  _renderLoadedView() {
    return(
      <View>
        <ScrollView>
          <Text>{attendanceDate(this.state.date)}</Text>
          <Text>{this.state.courseTitle}</Text>
          {this._renderAttendances()}
        </ScrollView>
        <Button
          onPress={this._submitAttendances.bind(this)}
          title="Submit"
        />
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
      <View>
        { attendances }
      </View>
    );
  }
}

// TODO (Kelsey): Add PropTypes from navigation

export default AttendanceScreen;
