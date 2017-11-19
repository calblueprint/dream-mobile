import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import CourseCard from '../../components/CourseCard/CourseCard';
import LocalStorage from '../../helpers/LocalStorage'
import { standardError } from '../../lib/request_callbacks';

class CoursesScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchCourses = this._fetchCourses.bind(this);
    this._handleSelectCourse = this._handleSelectCourse.bind(this);
    this._handleTakeAttendance = this._handleTakeAttendance.bind(this);
    this._handleViewStudents = this._handleViewStudents.bind(this);
    this._renderCourses = this._renderCourses.bind(this);
    this.state = {
      courses : { },
      teacher_dream_id : null,
      promiseLoading: true,
      isLoading : true,
    }
  }

  componentDidMount() {
    LocalStorage.getUser().then((user) => {
      this.setState({ teacher_dream_id: user.dream_id, promiseLoading: false });
      console.log(user.id)
      this._fetchCourses();
    });

  }

  /*
   * Get all course records and rerenders component to display courses.
   */
  _fetchCourses() {
    const params = {
      teacher_id: this.state.teacher_dream_id,
    }

    console.log(params)

    const successFunc = (responseData) => {
      console.log(responseData);
      this.setState({ courses: responseData, isLoading: false });
    }
<<<<<<< HEAD
    const errorFunc = (error) => {
      console.error(error);
    }
    getRequest(APIRoutes.getCoursesPath(), successFunc, errorFunc, params);
=======
    getRequest(APIRoutes.getCoursesPath(), successFunc, standardError);
>>>>>>> master
  }

  _handleSelectCourse(course_id) {
    this.props.navigation.navigate('ViewCourse', {
      refreshCourses: this._fetchCourses,
      course_id: course_id
    });
  }

  _handleTakeAttendance(course_id, title) {
    const date = new Date();
    this.props.navigation.navigate('Attendances', {
      courseId: course_id,
      courseTitle: title,
      date: date,
    });
  }
  _handleViewStudents(course_id) {
    this.props.navigation.navigate('Students', {
      courseId: course_id,
    })
  }

  _renderCourses() {
    return this.state.courses.map((course, i) => (
      <CourseCard key={i}
        course_id={course.id}
        title={course.title}
        onSelectCourse={this._handleSelectCourse}
        onTakeAttendance={this._handleTakeAttendance}
        onViewStudents={this._handleViewStudents} />
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
      courses = this._renderCourses();
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
