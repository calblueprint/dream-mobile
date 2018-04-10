import React from 'react';
import { Image, Button, ScrollView, Text, View, TouchableOpacity, RefreshControl } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { commonStyles } from '../../styles/styles';
import { getRequest, putRequestNoCatch } from '../../lib/requests';
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
    this.state = {
      refreshing: true,
    };
  }

  componentDidMount() {
    //TODO: (Aivant) Fix Helen's comment about how we shouldn't clean out current local changes
    //TODO: (Aivant) ensure that a user can't update another teacher's attendances
    // This prioritizes local changes over on-server changes but it makes the code very clean
    this.props.fetchCourses(this.props.teacher).then((result) => {
      this.props.syncLocalChanges(this.props.localAttendances);
    });

    const _createCourse = () => {
       this.props.navigation.navigate('EditCourse', {refreshCourses: this.props.fetchCourses, newCourse: true,
        sessions: [], teacher: this.props.teacher})}


    this.props.navigation.setParams({ handleCreate: _createCourse });
  }

  _handleSelectCourse(courseId) {
    this.props.navigation.navigate('ViewCourse', {
      refreshCourses: this.props.fetchCourses,
      course_id: courseId
    });
  }

  _handleTakeAttendance(courseId, title) {
    const date = attendanceDate(new Date());
    this.props.navigation.navigate('Attendances', {
      courseId: courseId,
      date: date,
    });
  }

  _onRefresh() {
    //TODO: (Aivant) take into account possible offline mode
    this.props.fetchCourses(this.props.teacher).then((result) => {
      return this.props.syncLocalChanges(this.props.localAttendances);
    })
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
        onTakeAttendance={this._handleTakeAttendance}
        numStudents={course.students ? course.students.length : 0}
        synced={"synced" in course ? course.synced : true}/>
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
    courses = this._renderCourses();
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.props.isLoading}
          onRefresh={this._onRefresh.bind(this)}
        />}
      >
        <View style={{backgroundColor: '#f5f5f6'}}>
          { courses }
        </View>
      </ScrollView>
    );

  }
}

/**
  * Loops through provided and attempts to sync each with server
  * Takes in array of courseIds to know which one to update in the store.
  */
const syncLocalChanges = (attendances) => {
  return (dispatch) => {
    // Clear changes and retry for each thing. Each failed sync will re-add the attendance to local
    const attendancePromises = attendances.map((attendance, i) => {
      return dispatch(syncAttendances(attendance.attendances, attendance.courseId, attendance.date));
    });
    return Promise.all(attendancePromises);
  }
}

//TODO: Decide whether fetch courses should be consolidated on the backend to just return all this information..
const fetchCourses = (teacher) => {
  return (dispatch) => {
    dispatch(actions.requestCourses());
    let path = teacher.admin ? APIRoutes.getCoursesPath() : APIRoutes.getTeacherCoursesPath(teacher.id);
    return getRequest(
      path,
      (responseData) =>  {
        console.log("Fetched courses");
        dispatch(actions.receiveCoursesSuccess(responseData))
        for (const key in responseData) { // Once you have the courses, fetch student and attendance data
          dispatch(fetchStudents(responseData[key].id));
          dispatch(fetchRecentCourseAttendances(responseData[key].id));
        }
      },
      (error) => {
        console.log("Error in fetching courses: ");
        console.log(error);
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
      APIRoutes.getCourseStudentsPath(courseId),
      (responseData) => {
        console.log("Fetched students for course: " + courseId);
        console.log(responseData);
        dispatch(actions.receiveStudentsSuccess(responseData, courseId));
      },
      (error) => {
        console.log("Error in fetching students for course: " + courseId);
        console.log(error);
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
        console.log("Fetched attendances for course: " + courseId);
        console.log(responseData);
        dispatch(actions.receiveCourseAttendancesSuccess(responseData, courseId))
      },
      (error) => {
        console.log("Error in fetching attendances for course: " + courseId);
        console.log(error);
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      }
    );
  }
}

/**
  * Attempts to update each changed attendance and waits for each request to succeed
  * and shows different modal based on whether sync succeeded or failed. Only saves attendance to
  * store if directed to
  */
const syncAttendances = (attendances, courseId, date, saveToStore) => {
  return (dispatch) => {
    dispatch(actions.requestUpdateAttendances(courseId, date));
    const attendancePromises = attendances.map((attendance, i) => {
      return updateAttendance(attendance, i);
    });
    // Those dispatches will only update the store if courseId exists in the current store
    return Promise.all(attendancePromises).then((responseData) => {
      // clear localStorage of the attendances we successfully synced
      const datesToClear = responseData.map((a) => {return a.date});
      dispatch(actions.clearLocalChanges(datesToClear));
      dispatch(actions.receiveUpdateAttendancesSuccess(responseData, courseId, date));
    }).catch((error) => {
      dispatch(actions.receiveUpdateAttendancesError(attendances, courseId, date));
    });
  }
}

/**
  * Makes put request to update given attendance if it has been changed
  * (Uses putRequestNoCatch so any errors get caught in Promise.all)
  */
const updateAttendance = (attendance, index) => {
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
  console.log("Mapping state to props for courses screen");
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
