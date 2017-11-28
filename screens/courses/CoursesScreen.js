import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import CourseCard from '../../components/CourseCard/CourseCard';
import LocalStorage from '../../helpers/LocalStorage'

class CoursesScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleSelectCourse = this._handleSelectCourse.bind(this);
    this._handleTakeAttendance = this._handleTakeAttendance.bind(this);
    this._handleViewStudents = this._handleViewStudents.bind(this);
    this._renderCourses = this._renderCourses.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
      profileView = () => {
       navigation.navigate('TeacherProfile', { teacher: this.props.teacher })
      }
      return {
          headerLeft: <Button title="Profile" onPress={profileView.bind(this)} />
      };
  };

  componentDidMount() {
    this.props.fetchCourses({
      teacher_id: this.props.teacher.dream_id,
    });
  }

  _handleSelectCourse(course_id) {
    this.props.navigation.navigate('ViewCourse', {
      refreshCourses: this.props.fetchCourses,
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
    return this.props.courses.map((course, i) => (
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
    if (this.props.isLoading) {
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
            onPress={() => navigate('EditCourse', {refreshCourses: this.props.fetchCourses, newCourse: true, sessions: []})}
            title="Create Course"
          />
          { courses }
        </View>
      </ScrollView>
    );

  }
}

const fetchCourses = (params) => {
  return (dispatch) => {
    dispatch(actions.requestCourses());
    return getRequest(
      APIRoutes.getCoursesPath(),
      (responseData) => dispatch(actions.receiveCoursesSuccess(responseData)),
      (error) => {
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      },
      params
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher,
    courses: state.courses,
    isLoading: state.isLoading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: (params) => dispatch(fetchCourses(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesScreen);
