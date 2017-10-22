import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../../config/styles';

class AttendanceSheetScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchCourses = this._fetchCourses.bind(this);
    this._renderCourses = this._renderCourses.bind(this);
    this.state = {
      attendances : { },
      students : { },
      isLoading : true,
      courseId: this.props.courseId
    }
  }

  componentDidMount() {
    this._fetchStudents(this.state.courseId);
    this._fetchAttendances();
  }

  _fetchStudents(courseId) {
    const successFunc = (courseId) => {

    }

    const errorFunc = (error) => {

    }
  }

  _fetchAttendances() {

  }

  _renderCourses() {
    return this.state.courses.map(function(course, i) {
      return(
        <View key={i}>
          <Text>{course.id} {course.title}</Text>
        </View>
      );
    });
  }

  render() {
    let courses;
    if (this.state.isLoading) {
      // TODO (casey): Add loading gif.
      courses = (
        <Text>Loading...</Text>
      )
    } else {
      courses = this._renderCourses()
    }
    return (
      <View style={styles.container}>
        { courses }
      </View>
    );
  }
}

export default AttendanceSheetScreen;
