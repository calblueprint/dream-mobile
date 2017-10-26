import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { styles } from '../../styles/styles';
import { APIRoutes } from '../../config/routes';
import { getRequest, postRequest, putRequest } from '../../lib/requests';
import settings from '../../config/settings';
import AttendanceCard from '../../components/AttendanceCard';

console.disableYellowBox = true;

class AttendanceScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attendances : { },
      students : { },
      isLoading : true,
      date: this.props.navigation.state.params.date,
      courseId: this.props.navigation.state.params.courseId,
    }
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
    * Method passed to AttendanceCard to update state for the given attendance object
    */
  _updateAttendance(attendance, index) {
    const attendances = this.state.attendances
    attendances[index] = attendance
    this.setState({ attendances: attendances })
  }

  /**
    * Attempts to update each changed and waits for each request to succeed
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
    * Renders AttendanceCard for each attendance object
    */
  _renderAttendances() {
    return this.state.attendances.map((attendance, i) => {
      return(
        <AttendanceCard key={i}
          attendance={attendance}
          index={i}
          name={this._getStudentName(i)}
          updateAttendance={this._updateAttendance.bind(this)}/>
      );
    });
  }

  _renderLoadedView() {
    return(
      <View>
        <ScrollView>
          {this._renderAttendances()}
        </ScrollView>
        <Button
          onPress={this._submitAttendances.bind(this)}
          title="Submit"
        />
      </View>
    )
  }

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

// TODO (Kelsey): Add PropTypes from navigation

export default AttendanceScreen;
