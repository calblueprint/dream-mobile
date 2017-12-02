import React from 'react';
import { Image, Button, ScrollView, Text, View } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import { attendanceDate } from '../../lib/date';
import CourseCard from '../../components/CourseCard/CourseCard';

class CoursesScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleSelectCourse = this._handleSelectCourse.bind(this);
    this._handleTakeAttendance = this._handleTakeAttendance.bind(this);
    this._renderCourses = this._renderCourses.bind(this);
  }

  componentDidMount() {
    this.props.fetchCourses(this.props.teacher.id);
  }

  _handleSelectCourse(course_id) {
    this.props.navigation.navigate('ViewCourse', {
      refreshCourses: this.props.fetchCourses,
      course_id: course_id
    });
  }

  _handleTakeAttendance(course_id, title) {
    const date = attendanceDate(new Date());
    this.props.navigation.navigate('Attendances', {
      courseId: course_id,
      courseTitle: title,
      date: date,
    });
  }

  _renderCourses() {
    const { navigate } = this.props.navigation;
    const courses = this.props.courses.map((course, i) => (
      <CourseCard key={i}
        course_id={course.id}
        title={course.title}
        onSelectCourse={this._handleSelectCourse}
        onTakeAttendance={this._handleTakeAttendance}/>
      )
    );
    return (
      <View>
        <Button
          onPress={() => navigate('EditCourse', {refreshCourses: this.props.fetchCourses, newCourse: true, sessions: []})}
          title="Create Course"
        />
        { courses }
      </View>
    );
  }

  render() {
    let courses;
    if (this.props.isLoading) {
      courses = (
        <Image
          style={commonStyles.icon}
          source={require('../../icons/spinner.gif')}
        />
      )
    } else {
      courses = this._renderCourses();
    }
    return (
      <ScrollView>
        <View>
          { courses }
        </View>
      </ScrollView>
    );

  }
}

const fetchCourses = (teacherId) => {
  return (dispatch) => {
    dispatch(actions.requestCourses());
    return getRequest(
      APIRoutes.getTeacherCoursesPath(teacherId),
      (responseData) => dispatch(actions.receiveCoursesSuccess(responseData)),
      (error) => {
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      }
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher,
    courses: state.courses,
    isLoading: state.isLoading.value,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: (teacherId) => dispatch(fetchCourses(teacherId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesScreen);
