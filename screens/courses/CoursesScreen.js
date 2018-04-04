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
  }

  componentDidMount() {

    //TODO: Make sure that after you fetch courses, you merge any existing local changes with courses.
    this.props.syncLocalChanges(this.props.localAttendances).then((result) => {
      return this.props.fetchCourses(this.props.teacher);
    }).then((result) => {
      console.log("Finished fetch courses call");
    });


    const _createCourse = () => {
       this.props.navigation.navigate('EditCourse', {refreshCourses: this.props.fetchCourses, newCourse: true,
        sessions: [], teacher: this.props.teacher})}


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
          onPress={() => navigate('EditCourse', {refreshCourses: this.props.fetchCourses, newCourse: true,
            sessions: [], teacher: this.props.teacher})}
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
    return (
      <ScrollView>
        <View style={{backgroundColor: '#f5f5f6'}}>
          { courses }
        </View>
      </ScrollView>
    );

  }
}

//TODO: Need to convert to promise
const syncLocalChanges = (attendances) => {
  return (dispatch) => {
    const attendancePromises = attendances.map((attendance, i) => {
      return dispatch(syncAttendances(attendance.attendances, attendance.courseId, attendance.date));
    });
    return Promise.all(attendancePromises);
  }
}

const fetchCourses = (teacher) => {
  return (dispatch) => {
    dispatch(actions.requestCourses());
    let path = teacher.admin ? APIRoutes.getCoursesPath : APIRoutes.getTeacherCoursesPath;
    return getRequest(
      path,
      (responseData) =>  {
        dispatch(actions.receiveCoursesSuccess(responseData))
        for (const key in responseData) { // Once you have the courses, fetch student and attendance data
          dispatch(fetchStudents(responseData[key].id));
          //dispatch(fetchRecentCourseAttendances(responseData[key].id));
        }
      },
      (error) => {
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      }
    );
  }
}

/**
  * Fetches all students with the given course id and on success
  * gets attendances for each student
  */
const fetchStudents = (courseId) => {
  return (dispatch) => {
    dispatch(actions.requestStudents(courseId));
    return getRequest(
      APIRoutes.getStudentsPath(courseId),
      (responseData) => {
        dispatch(actions.receiveStudentsSuccess(responseData, courseId));
      },
      (error) => {
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      }
    );
  }
}

/**
  * Attempts to get attendance for each students and waits for each request to succeed
  * before updating state for attendances
  */
const fetchRecentCourseAttendances = (courseId) => {
  return (dispatch) => {
    dispatch(actions.requestCourseAttendances(courseId));

    return getRequest(
      APIRoutes.getRecentAttendancesPath(courseId),
      (responseData) =>  {
        console.log("Course: " + courseId);
        console.log(responseData);
        dispatch(actions.receiveCourseAttendancesSuccess(responseData))
      },
      (error) => {
        console.log("Error :(")
        console.log(error)
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      }
    );
  }
}

/**
  * Attempts to update each changed attendance and waits for each request to succeed
  * and shows different modal based on whether sync succeeded or failed. Saves attendances
  * to store regardless of success/failiure.
  */
syncAttendances = (attendances, courseId, date) => {
  return (dispatch) => {
    dispatch(actions.requestUpdateAttendances(courseId, date));
    const attendancePromises = attendances.map((attendance, i) => {
      return updateAttendance(attendance, i);
    });

    return Promise.all(attendancePromises).then((responseData) => {
      dispatch(actions.receiveUpdateAttendancesSuccess(responseData, courseId, date));
    }).catch((error) => {
      // marks course as unsynced
      dispatch(actions.receiveUpdateAttendancesError(attendances, courseId, date));
    });
  }
}

/**
  * Makes put request to update given attendance if it has been changed
  * (Uses putRequestNoCatch so any errors get caught in Promise.all)
  */
updateAttendance = (attendance, index) => {
  const successFunc = (responseData) => {
    return responseData;
  }
  const errorFunc = (error) => {
    console.log(error);
  }
  const params = attendance

  if (attendance.isChanged) {
    return putRequestNoCatch(APIRoutes.attendancePath(), successFunc, errorFunc, params);
  } else {
    return attendance;
  }
}

const mapStateToProps = (state) => {
  return {
    localAttendances: state.localChanges.attendances,
    teacher: state.teacher,
    courses: state.courses,
    isLoading: state.isLoading.value,
    online: state.offline.online,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    syncLocalChanges: (attendances) => dispatch(syncLocalChanges(attendances)),
    fetchCourses: (teacher) => dispatch(fetchCourses(teacher)),
    fetchStudents: (courseId, date) => dispatch(fetchStudents(courseId, date)),
    fetchRecentCourseAttendances: (students, courseId, date) => dispatch(fetchRecentCourseAttendances(students, courseId, date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesScreen);
