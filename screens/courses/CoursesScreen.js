import React from 'react';
import { Image, Button, ScrollView, Text, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import CourseCard from '../../components/CourseCard/CourseCard';
import LocalStorage from '../../helpers/LocalStorage'

class CoursesScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchCourses = this._fetchCourses.bind(this);
    this._handleSelectCourse = this._handleSelectCourse.bind(this);
    this._handleTakeAttendance = this._handleTakeAttendance.bind(this);
    this._renderCourses = this._renderCourses.bind(this);
    this.state = {
      courses : { },
      teacher : { },
      teacher_dream_id : null,
      isLoading : true,
    }
  }

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
          headerLeft: <Button title="Profile" onPress={() => params.handleProfile()} />
      };
  };

  componentDidMount() {
    LocalStorage.getUser().then((user) => {
      this.setState({ teacher_dream_id: user.dream_id,
                      teacher: user });
      _profileView = () => {
        this.props.navigation.navigate('TeacherProfile',
                                      { teacher: this.state.teacher })
      }
      this._fetchCourses();
      this.props.navigation.setParams({ handleProfile: _profileView });
    });

  }

  /*
   * Get all course records and rerenders component to display courses.
   */
  _fetchCourses() {
    const successFunc = (responseData) => {
      this.setState({ courses: responseData, isLoading: false });
    }
    const params = {
      teacher_id: this.state.teacher_dream_id,
    }
    getRequest(APIRoutes.getCoursesPath(), successFunc, standardError, params);
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

  _renderCourses() {
    <Button
      onPress={() => navigate('EditCourse', {refreshCourses: this._fetchCourses, newCourse: true, sessions: []})}
      title="Create Course"
    />
    return this.state.courses.map((course, i) => (
      <CourseCard key={i}
        course_id={course.id}
        title={course.title}
        onSelectCourse={this._handleSelectCourse}
        onTakeAttendance={this._handleTakeAttendance}/>
      )
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let courses;
    if (this.state.isLoading) {
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

export default CoursesScreen;
