import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

class ViewCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchCourse = this._fetchCourse.bind(this);
    this._deleteCourse = this._deleteCourse.bind(this);
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
   * Fetch recrod for single course.
   */
  _fetchCourse() {
    const successFunc = (responseData) => {
      this.setState({ course: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO (caseytaka): Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getCoursePath(this.state.course_id), successFunc, errorFunc);
  }

  /*
   * Make a delete request. On success, re-render the component.
   */
  _deleteCourse() {
    const successFunc = (responseData) => {
      this.props.navigation.state.params.refreshCourses();
      this.props.navigation.goBack(null);
    }
    const errorFunc = (error) => {
      console.error(error);
    }
    deleteRequest(APIRoutes.getCoursePath(this.state.course_id), successFunc, errorFunc);
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
