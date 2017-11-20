import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { timeFormat } from '../../lib/time';
import { standardError } from '../../lib/request_callbacks';

class ViewCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchCourse = this._fetchCourse.bind(this);
    this._deleteCourse = this._deleteCourse.bind(this);
    this._renderCourseSession = this._renderCourseSession.bind(this);
    this._renderCourseDate = this._renderCourseDate.bind(this);
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
      this.setState({ sessions: responseData.sessions, isLoading: false });
    }
    getRequest(APIRoutes.getSessionsPath(this.state.course_id), successFunc, standardError);
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
   * Display course session day and time.
   */
  _renderCourseSession() {
    const session_start = timeFormat(new Date(this.state.course.start_time))
    const session_end = timeFormat(new Date(this.state.course.end_time))
    return (
      <Text>{ this.state.course.weekday }'s { session_start } to { session_end }</Text>
    );
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

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      // TODO (caseytaka): Add loading gif.
      return (
        <Text>Loading...</Text>
      );
    } else {
      return (
        <ScrollView>
          <View style={commonStyles.container}>
            <Text>{ this.state.course.title }</Text>
            <Text>Teacher ID 1: { this.state.course.teacher_id1 }</Text>
            <Text>Teacher ID 2: { this.state.course.teacher_id2 }</Text>
            <Text>{ this._renderCourseDate() }</Text>
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

export default ViewCourseScreen;
