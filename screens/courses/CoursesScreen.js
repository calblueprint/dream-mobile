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
import { putRequestNoCatch } from '../../lib/requests';
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
    // Attempt to Sync Unsynced attendances
    for (var courseIndex in this.props.courses) {
      this.syncAllAttendances(this.props.courses[courseIndex]);
    }
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

  syncAllAttendances(course) {
    for(var date in course.attendances) {
      if(!course.attendances[date]["isSynced"]) {
        this.props.syncAttendances(course.attendances[date].list, course.id, date);
      }
    }
  }

  _renderCourses() {
    const { navigate } = this.props.navigation;

    var courses_arr = new Array();
    for (const key in this.props.courses) {
      courses_arr.push(this.props.courses[key]);
    }

    let isCourseSynced = (course) => {
      if(!("attendances" in course)) { return true }
      syncedArray = Object.keys(course.attendances).map((key) => ("isSynced" in course.attendances[key] && course.attendances[key]["isSynced"]));
      return syncedArray.every(x => x==true);
    }

    const courses = courses_arr.map((course, i) => (
      <CourseCard key={i}
        index={i}
        course_id={course.id}
        title={course.title}
        synced={isCourseSynced(course)}
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
    return (
      <ScrollView>
        <View style={{backgroundColor: '#f5f5f6'}}>
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


/**
  * Attempts to update each changed attendance and waits for each request to succeed
  * and shows different modal based on whether sync succeeded or failed. Saves attendances
  * to store regardless of success/failiure.
  */
const syncAttendances = (attendances, courseId, date) => {
  return (dispatch) => {
    dispatch(actions.requestUpdateAttendances(courseId, date));
    const attendancePromises = attendances.map((attendance, i) => {
      return updateAttendance(attendance, i);
    });

    Promise.all(attendancePromises).then((responseData) => {
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
  return putRequestNoCatch(APIRoutes.attendancePath(), successFunc, errorFunc, params);

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
    syncAttendances: (attendances, courseId, date) => dispatch(syncAttendances(attendances, courseId, date)),
    fetchCourses: (teacherId) => dispatch(fetchCourses(teacherId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesScreen);
