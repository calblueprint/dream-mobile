import React from 'react';
import { Image, Button, ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import { attendanceDate } from '../../lib/date';
import SearchResultCard from '../../components/SearchResultCard/SearchResultCard';
import StyledButton from '../../components/Button/Button';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../styles/colors';

class SearchStudentResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleSelectStudent = this._handleSelectStudent.bind(this);
    this._handleTakeAttendance = this._handleTakeAttendance.bind(this);
    this._renderSearchResults = this._renderSearchResults.bind(this);

    this.state = {
      students: this.props.navigation.state.params.students,
      course_id: this.props.navigation.state.params.course_id,
    }
  }

  componentDidMount() {
    this.props.fetchCourses(this.props.teacher);

    const _createCourse = () => {
      this.props.navigation.navigate('EditCourse', {refreshCourses: this.props.fetchCourses, newCourse: true,
        sessions: [], teacher: this.props.teacher})}


    this.props.navigation.setParams({ handleCreate: _createCourse });
  }

  _handleSelectStudent(id) {
    this.props.navigation.navigate('StudentProfilePreview', {
      refreshStudents: this.props.navigation.state.params.refreshStudents,
      course_id: this.state.course_id,
      studentId: id
    });
  }

  _handleTakeAttendance(course_id, title) {
    const date = attendanceDate(new Date());
    this.props.navigation.navigate('Attendances', {
      course_id: course_id,
      courseTitle: title,
      date: date,
    });
  }

  _renderSearchResults() {
    const { navigate } = this.props.navigation;

    var students_arr = new Array();
    for (const key in this.state.students) {
      students_arr.push(this.state.students[key]);
    }

    const students = students_arr.map((student, i) => (
        <SearchResultCard key={i}
                          id={student.id}
                          student={student}
                          onSelectStudent={this._handleSelectStudent}/>
      )
    );
    return (
      <View style={{marginBottom: 24}}>
        { students }
        <StyledButton
          onPress={() => navigate('EditCourse', {refreshCourses: this.props.fetchCourses, newCourse: true,
            sessions: [], teacher: this.props.teacher})}
          text='Next'
          primaryButtonLarge>
        </StyledButton>
      </View>
    );
  }

  render() {
    let results;
    if (this.props.isLoading) {
      results = (
        <Image
          style={commonStyles.icon}
          source={require('../../icons/spinner.gif')}
        />
      )
    } else {
      results = this._renderSearchResults();
    }
    return (
      <ScrollView>
        <View style={{backgroundColor: '#f5f5f6'}}>
          { results }
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
        (responseData) => dispatch(actions.receiveCoursesSuccess(responseData)),
        (error) => {
          dispatch(actions.receiveStandardError(error));
          standardError(error);
        }
      );
    } else {
      return getRequest(
        APIRoutes.getTeacherCoursesPath(teacher.id),
        (responseData) => dispatch(actions.receiveCoursesSuccess(responseData)),
        (error) => {
          dispatch(actions.receiveStandardError(error));
          standardError(error);
        }
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher,
    student: state.student,
    isLoading: state.isLoading.value,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: (teacher) => dispatch(fetchCourses(teacher)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStudentResultScreen);
