import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../../config/styles';
import { APIRoutes } from '../../config/routes';
import { getRequest, postRequest, putRequest } from '../../lib/requests';
import settings from '../../config/settings';
import AttendanceCard from '../../components/AttendanceCard';

class AttendanceSheetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendances : { },
      students : { },
      isLoading : true,
      courseId: this.props.navigation.state.params.courseId,
    }

    this.updateAttendance = this.updateAttendance.bind(this)
  }

  componentDidMount() {
    this._fetchStudents(this.state.courseId);
  }

  _fetchStudents(courseId) {
    const successFunc = (responseData) => {
      this.setState({ students: responseData });
      this._getAttendances(responseData);
    }
    const errorFunc = (error) => {
      console.log(error)
    }
    getRequest(APIRoutes.getStudentsPath(courseId), successFunc, errorFunc);
  }

  _getAttendances(students) {
    const date = new Date();
    const attendances = students.map((student) => {
      return this._fetchAttendance(student.id, date);
    });

    Promise.all(attendances).then((attendances) => {
      this.setState({ attendances: attendances, isLoading: false })
    }).catch((error) => {
      console.log(error);
    });
  }


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

  updateAttendance(attendance) {
    index = this.state.attendances.findIndex((attendanceItem) => attendanceItem.id === attendance.id)
    const attendances = this.state.attendances
    attendances[index] = attendance
    this.setState({ attendances: attendances })
  }

  _getAttendances(students) {
    const date = new Date();
    const attendances = students.map((student) => {
      return this._fetchAttendance(student.id, date);
    });

    Promise.all(attendances).then((attendances) => {
      this.setState({ attendances: attendances, isLoading: false })
    }).catch((error) => {
      console.log(error);
    });
  }

  _updateAttendances() {
    const attendances = this.state.attendances.map((attendance) => {
      return this._putAttendance(attendance);
    });

    Promise.all(attendances).then((attendances) => {
      this.props.navigation.goBack(null);
    }).catch((error) => {
      console.log(error);
    });
  }


  _putAttendance(attendance) {
    const successFunc = (responseData) => {
      return responseData;
    }
    const errorFunc = (error) => {
      // TODO (Kelsey): address what happens when attendance for student on given date doesn't exist
      console.log(error)
    }
    const params = attendance
    return putRequest(APIRoutes.attendancePath(), successFunc, errorFunc, params);
  }

  _renderAttendances() {
    return this.state.attendances.map((attendance, i) => {
      return(
        <AttendanceCard key={i}
          attendance={attendance}
          name={this.state.students.find((student) => student.id == attendance.student_id).first_name}
          updateAttendance={this.updateAttendance}/>
      );
    });
  }

  _renderLoaded() {
    return(
      <View>
        {this._renderAttendances()}
        <Button
          onPress={this._updateAttendances.bind(this)}
          title="Submit"
        />
      </View>
    )
  }

  render() {
    let attendances;
    if (this.state.isLoading) {
      // TODO (casey): Add loading gif.
      attendances = (
        <Text>Loading...</Text>
      )
    } else {
      attendances = this._renderLoaded();
    }
    return (
      <View style={styles.container}>
        { attendances }
      </View>
    );
  }
}

export default AttendanceSheetScreen;
