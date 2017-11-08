import React from 'react';
import { Alert, Button, ScrollView, Text, View } from 'react-native';
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
    this._handleDeleteCourse = this._handleDeleteCourse.bind(this);
    this._renderCourseTeachers = this._renderCourseTeachers.bind(this);
    this._renderCourseSession = this._renderCourseSession.bind(this);
    this._renderCourseDate = this._renderCourseDate.bind(this);
    this.state = {
      course_id : this.props.navigation.state.params.course_id,
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
      this.setState({ course: responseData, isLoading: false });
    }
    getRequest(APIRoutes.getCoursePath(this.state.course_id), successFunc, standardError);
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
   * Delete confirmation before deleting course.
   */
  _handleDeleteCourse() {
    Alert.alert(
      'Delete Course?',
      'Are you sure you want to delete this course?',
      [
        {text: 'Delete', onPress: this._deleteCourse},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ],
    )
  }

  /*
   * Display course teacher names.
   */
  _renderCourseTeachers() {
   /*
    * TODO(caseytaka): Render teacher names of course! Not just teacher dream_ids.
    * Will need to make another getRequest for the teacher records.
    */

    // const teachers = this.state.course.teachers.map((teacher, i) => {
    //   return (
    //     <Text>{ teacher.first_name } { teacher.last_name }</Text>
    //   );
    // });
    // return (
    //   <View>
    //     { teachers }
    //   </View>
    // );
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
            <Text>{ this._renderCourseSession() }</Text>
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
                  weekday: this.state.course.weekday,
                  start_time: this.state.course.start_time,
                  end_time: this.state.course.end_time,
                  start_date: this.state.course.start_date,
                  end_date: this.state.course.end_date,
                })}
              title="Edit Course"
            />
            <Button
              onPress={() => this._handleDeleteCourse()}
              title='Delete'
            />
          </View>
        </ScrollView>
      );
    }
  }
}

export default ViewCourseScreen;
