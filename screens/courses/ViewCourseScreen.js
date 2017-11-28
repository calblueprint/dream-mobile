import React from 'react';
import { Image, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { timeFormat } from '../../lib/datetime_formats';
import { standardError } from '../../lib/alerts';

class ViewCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchCourse = this._fetchCourse.bind(this);
    this._fetchSessions = this._fetchSessions.bind(this);
    this._fetchTeachers = this._fetchTeachers.bind(this);
    this._deleteCourse = this._deleteCourse.bind(this);
    this._renderCourseDate = this._renderCourseDate.bind(this);
    this._renderSessions = this._renderSessions.bind(this);
    this._renderTeachers = this._renderTeachers.bind(this);
    this.state = {
      course_id : this.props.navigation.state.params.course_id,
      sessions: [],
      course : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchCourse();
  }

  /*
   * Fetch record for single course.
   */
  _fetchCourse() {
    const successFunc = (responseData) => {
      this.setState({ course: responseData });
      this._fetchSessions();
    }
    getRequest(APIRoutes.getCoursePath(this.state.course_id), successFunc, standardError);
  }

  /*
   * Fetch record for single course.
   */
  _fetchSessions() {
    const successFunc = (responseData) => {
      this.setState({ sessions: responseData.sessions });
      this._fetchTeachers();
    }
    getRequest(APIRoutes.getSessionsPath(this.state.course_id), successFunc, standardError);
  }

  /*
   * Fetch record for the course.
   */
  _fetchTeachers() {
    const successFunc = (responseData) => {
      this.setState({ teachers: responseData.teachers, isLoading: false });
    }
    getRequest(APIRoutes.getTeachersPath(this.state.course_id), successFunc, standardError);
  }

  /*
   * Make a delete request. On success, re-render the component.
   */
  _deleteCourse() {
    const successFunc = (responseData) => {
      this.props.navigation.state.params.refreshCourses();
      this.props.navigation.goBack(null);
    }
    deleteRequest(APIRoutes.getCoursePath(this.state.course_id), successFunc, standardError);
  }

  /*
   * Display course dates.
   */
  _renderCourseDate() {
    const start_date = new Date(this.state.course.start_date)
    const end_date = new Date(this.state.course.end_date)
    const course_start = start_date.toLocaleDateString()
    const course_end = end_date.toLocaleDateString()
    return (
      <Text>In session { course_start } to { course_end } </Text>
    );
  }

  /*
   * Display course teachers.
   */
  _renderTeachers() {
    return this.state.teachers.map((teacher, index) => {
      return (
        <Text key={index}>Teacher {index + 1}: {teacher.first_name} {teacher.last_name}</Text>
      );
    });
  }

  /*
   * Display course sessions.
   */
  _renderSessions() {
    return this.state.sessions.map((session, index) => {
      const start = timeFormat(new Date(session.start_time))
      const end = timeFormat(new Date(session.end_time))
      return (
        <Text key={index}>Session {index + 1}: { session.weekday }'s { start } to { end }</Text>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={commonStyles.containerStatic}>
          <Image
            style={commonStyles.icon}
            source={require('../../icons/spinner.gif')}
          />
      </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={viewStyles.container}>
            <Text>{ this.state.course.title }</Text>
            { this._renderTeachers() }
            { this._renderCourseDate() }
            { this._renderSessions() }
            <Button
              onPress={() => navigate('EditCourse',
                {
                  refreshCourses: this._fetchCourse,
                  newCourse: false,
                  course_id: this.state.course_id,
                  is_active: this.state.course.is_active,
                  title: this.state.course.title,
                  teacher1: this.state.course.teacher_id1,
                  teacher2: this.state.course.teacher_id2,
                  start_date: this.state.course.start_date,
                  end_date: this.state.course.end_date,
                  sessions: this.state.sessions,
                })}
              title="Edit Course"
            />
            <Button
              onPress={() => this._deleteCourse()}
              title='Delete'
            />
          </View>
        </ScrollView>
      );
    }
  }
}

const viewStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 16,
    paddingLeft: 16,
  },
});

export default ViewCourseScreen;
