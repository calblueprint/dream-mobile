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
    this.props.fetchCourses(this.props.teacher);

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

const fetchCourses = (teacher) => {
  return (dispatch) => {
    dispatch(actions.requestCourses());
    if (teacher.admin) {
      return getRequest(
        APIRoutes.getCoursesPath(),
        (responseData) =>  {
          dispatch(actions.receiveCoursesSuccess(responseData))
          for (const key in responseData) { // Once you have the courses, fetch student and attendance data
            dispatch(fetchStudents(responseData[key].id));
            dispatch(fetchRecentCourseAttendances(responseData[key].id));
          }
        },
        (error) => {
          dispatch(actions.receiveStandardError(error));
          standardError(error);
        }
      );
    } else {
      return getRequest(
        APIRoutes.getTeacherCoursesPath(teacher.id),
        (responseData) => {
          dispatch(actions.receiveCoursesSuccess(responseData))
          for (const key in responseData) {
            dispatch(fetchStudents(responseData[key].id));
            dispatch(fetchRecentCourseAttendances(responseData[key].id));
          }
        },
        (error) => {
          dispatch(actions.receiveStandardError(error));
          standardError(error);
        }
      );
    }
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
        console.log("students: ");
        console.log(responseData);
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
      APIRoutes.getCoursesPath(),
      (responseData) =>  {
        dispatch(actions.receiveCoursesSuccess(responseData))
        for (const key in responseData) { // Once you have the courses, fetch student and attendance data
          dispatch(fetchStudents(responseData[key].id));
          dispatch(fetchRecentCourseAttendances(responseData[key].id));
        }
      },
      (error) => {
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      }
    );
    const attendances = students.map((student) => {
      return fetchAttendance(student.id, courseId, date);
    });

    Promise.all(attendances).then((attendances) => {
      dispatch(actions.receiveAttendancesSuccess(attendances, courseId, date));
    }).catch((error) => {
      dispatch(actions.receiveStandardError(error));
      standardError(error);
    });
  }
}

/**
  * Makes a request to get attendance for the specified student.
  * (Uses postRequestNoCatch so any errors get caught in Promise.all)
  */
const fetchAttendance = (studentId, courseId, date) => {
  const successFunc = (responseData) => {
    return responseData;
  }
  const errorFunc = (error) => {
    // TODO (Kelsey): address what happens when attendance for student on given date doesn't exist
    console.log(error)
  }
  const params = {
    attendance: {
      student_id: studentId,
      date: date,
      course_id: courseId
    }
  }
  return postRequestNoCatch(APIRoutes.attendanceItemPath(), successFunc, errorFunc, params);
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
    fetchCourses: (teacher) => dispatch(fetchCourses(teacher)),
    fetchStudents: (courseId, date) => dispatch(fetchStudents(courseId, date)),
    fetchRecentCourseAttendances: (students, courseId, date) => dispatch(fetchRecentCourseAttendances(students, courseId, date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesScreen);
