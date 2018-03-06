import React from 'react';
import { Image, Button, ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import { attendanceDate } from '../../lib/date';
import CourseCard from '../../components/CourseCard/CourseCard';
import StyledButton from '../../components/Button/Button';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Toaster, { ToastStyles } from 'react-native-toaster'
import colors from '../../styles/colors';

class CoursesScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        headerRight: (
          <TouchableOpacity onPress={() => params.handleCreate()}>
            <View style={{marginRight: 8}}><MaterialCommunityIcons name="book-plus" size={30} color={colors.iconDark} /></View>
          </TouchableOpacity>
        )
    };
  };

  constructor(props) {
    super(props);
    this._handleSelectCourse = this._handleSelectCourse.bind(this);
    this._handleTakeAttendance = this._handleTakeAttendance.bind(this);
    this._renderCourses = this._renderCourses.bind(this);

    // this.state = { message: null }
    //
    // const messages = [
    //   { text: 'Online: ' + String(this.props.online) },
    //   // { text: 'Hooray!', styles: ToastStyles.success },
    //   // { text: 'Eek', styles: ToastStyles.warning },
    //   // { text: 'Oh noe!', styles: ToastStyles.error }
    // ];
    //
    // // Send each message 1 second apart
    // messages.forEach((message, i) => {
    //   setTimeout(() => this.setState({ message }), i * 10000)
    // })
  }

  componentDidMount() {
    this.props.fetchCourses(this.props.teacher.id);

    const _createCourse = () => {
       this.props.navigation.navigate('EditCourse', {refreshCourses: this.props.fetchCourses, newCourse: true, sessions: []})}


    this.props.navigation.setParams({ handleCreate: _createCourse });
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

    var courses_arr = new Array();
    for (const key in this.props.courses) {
      courses_arr.push(this.props.courses[key]);
    }

    const courses = courses_arr.map((course, i) => (
      <CourseCard key={i}
        index={i}
        course_id={course.id}
        title={course.title}
        onSelectCourse={this._handleSelectCourse}
        onTakeAttendance={this._handleTakeAttendance}/>
      )
    );
    return (
      <View style={{marginBottom: 24}}>
        { courses }
        <StyledButton
          onPress={() => navigate('EditCourse', {refreshCourses: this.props.fetchCourses, newCourse: true, sessions: []})}
          text='Create Course'
          primaryButtonLarge>
        </StyledButton>
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
    console.log("Re-rendered");
    if (this.props != null) {
      console.log("prop:");
      console.log(this.props.online);
    }

    let message = null;
    if (this.props.online) {
      message = {text: "You are connected", styles: ToastStyles.success, height: 80};
    } else {
      message = {text: "You are offline", styles: ToastStyles.error, height: 80};
    }
    return (
      <ScrollView>
        <View style={{backgroundColor: '#f5f5f6'}}>
          <Toaster message={message} />
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
    online: state.offline.online,
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
