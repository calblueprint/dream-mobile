import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
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

  _fetchCourses() {
    const successFunc = (responseData) => {
      this.setState({ courses: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO (caseytaka): Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getCoursesPath(), successFunc, errorFunc);
  }

  _deleteCourse() {

  }

  _handleSelectCourse(course_id) {
    this.props.navigation.navigate('ViewCourse', {course_id: course_id});
  }

  /*
   * Deletes the course and re-renders the component.
   */
  _handleDeleteCourse(course_id) {
    this._deleteCourse(course_id);
    this._fetchCourses();
  }

  _renderCourses() {
    const date = new Date();
    const { navigate } = this.props.navigation;
    return this.state.courses.map((course, i) => (
      <View key={i} style={cardStyles.container}>
        <CourseCard key={i}
          course_id={course.id}
          title={course.title}
          onSelectCourse={this._handleSelectCourse}
          onDeleteCourse={this._handleDeleteCourse} />
        <Button
          onPress={() => navigate('Attendances', {
            courseId: course.id,
            courseTitle: course.title,
            date: date
          })}
          title="Take Attendance"
        />
      </View>
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
            onPress={() => navigate('EditCourse', {refreshCourses: this._fetchCourses})}
            title="Create Course"
          />
          { courses }
        </View>
      </ScrollView>
    );

  }
}

export default CoursesScreen;
