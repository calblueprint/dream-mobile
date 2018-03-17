import React from 'react';
import { Image, Button, Text, View, ScrollView, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { commonStyles } from '../../styles/styles';
import { textStyles } from '../../styles/textStyles';
import { APIRoutes } from '../../config/routes';
import settings from '../../config/settings';
import { getRequest, postRequestNoCatch } from '../../lib/requests';
import AttendanceDateCard from '../../components/AttendanceDateCard/AttendanceDateCard';
import SimpleModal from '../../components/SimpleModal';
import { standardError } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';

class PastAttendancesScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStudents(this.props.courseId, this.props.date);
  }

  /**
    * Renders AttendanceCard for each attendance object
    */
  _renderAttendances() {
    return this.props.attendances.map((attendance, i) => {
      return(
        <AttendanceCard key={i}
          attendance={attendance}
          index={i}
          name={this._getStudentName(i)}
          setModal={this._setModal.bind(this)}
          setType={this._setType.bind(this)} />
      );
    });
  }

  /**
    * Renders date, course title, attendance cards, and submit button
    */
  _renderLoadedView() {
    const { navigate } = this.props.navigation;

    return(
      <View>
        <StyledButton
          onPress={() => navigate('RecentAttendances',
            { courseId: this.props.courseId,
            })}
          text="View Recent Attendances"
          primaryButtonLarge
        />
      <Text style={textStyles.titleLarge}>"Hello World1"</Text>
    </View>

    )
  }

  /**
    * Renders loading state if data is still loading or uses _renderLoadedView
    */
  render() {
    const attendances = this.props.isLoading ? (<Image style={commonStyles.icon}
                        source={require('../../icons/spinner.gif')}/>) : this._renderLoadedView();
    return (
      <View style={commonStyles.containerStatic}>
        { attendances }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Either change styles or generalize to AttendanceSummaryScreen too
  attendancesContainer: {
    marginRight: 16,
    marginLeft: 24,
  },
});
// TODO (Kelsey): Add PropTypes from navigation


/**
  * Fetches all students with the given course id and on success
  * gets attendances for each student
  */
const fetchStudents = (courseId, date) => {
  return (dispatch) => {
    dispatch(actions.requestStudents(courseId));
    return getRequest(
      APIRoutes.getStudentsPath(courseId),
      (responseData) => {
        dispatch(actions.receiveStudentsSuccess(responseData, courseId));
        dispatch(fetchAttendances(responseData, courseId, date));
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
const fetchAttendances = (students, courseId, date) => {
  return (dispatch) => {
    dispatch(actions.requestAttendances(courseId, date));
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

const mapStateToProps = (state, props) => {
  // Get course and date associated with this attendance screen
  const course = state.courses.find((course) => course.id === props.navigation.state.params.courseId);
  const date = props.navigation.state.params.date;
  return {
    ...props.navigation.state.params,
    students: course.students ? course.students : {},
    attendances: course.attendances && course.attendances[date] ? course.attendances[date].list : [],
    isLoading: state.isLoading.value,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (courseId, date) => dispatch(fetchStudents(courseId, date)),
    fetchAttendances: (students, courseId, date) => dispatch(fetchAttendances(students, courseId, date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PastAttendancesScreen);
