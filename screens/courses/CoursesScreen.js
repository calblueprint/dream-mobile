import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { styles } from '../../styles/styles';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import CourseCard from '../../components/CourseCard/CourseCard';

class CoursesScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchCourses = this._fetchCourses.bind(this);
    this._deleteCourse = this._deleteCourse.bind(this);
    this._renderCourses = this._renderCourses.bind(this);
    this._handleSelectCourse = this._handleSelectCourse.bind(this);
    this._handleDeleteCourse = this._handleDeleteCourse.bind(this);
    this.state = {
      courses : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchCourses();
  }

  /*
   * Get all course records and rerenders component to display courses.
   */
  _fetchCourses() {
    const successFunc = (responseData) => {
      this.setState({ courses: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      console.error(error);
    }
    getRequest(APIRoutes.getCoursesPath(), successFunc, errorFunc);
  }

  /*
   * Make a delete request. On success, re-render the component.
   */
  _deleteCourse(course_id) {
    const successFunc = (responseData) => {
      this.setState({ isLoading: false });
      this._fetchCourses();
    }
    const errorFunc = (error) => {
      console.error(error);
    }
    deleteRequest(APIRoutes.getCoursePath(course_id), successFunc, errorFunc);
  }

  _handleSelectCourse(course_id) {
    this.props.navigation.navigate('ViewCourse', {course_id: course_id});
  }

  /*
   * Set loading indicator and call function to delete the course.
   */
  _handleDeleteCourse(course_id) {
    this.setState({ isLoading: true });
    this._deleteCourse(course_id);
  }

  _renderCourses() {
    return this.state.courses.map((course, i) => (
      <CourseCard key={i}
        course_id={course.id}
        title={course.title}
        onSelectCourse={this._handleSelectCourse}
        onDeleteCourse={this._handleDeleteCourse} />
      )
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let courses;
    if (this.state.isLoading) {
      // TODO (caseytaka): Add loading gif.
      courses = (
        <Text>Loading...</Text>
      )
    } else {
      courses = this._renderCourses()
    }
    return (
      <ScrollView>
        <View>
          <Button
            onPress={() => navigate('EditCourse', {refreshCourses: this._fetchCourses, newCourse: true})}
            title="Create Course"
          />
          { courses }
        </View>
      </ScrollView>
    );

  }
}

export default CoursesScreen;
