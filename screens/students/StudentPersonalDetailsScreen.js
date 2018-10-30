import React from 'react';
import { View } from 'react-native';
import { APIRoutes } from '../../config/routes';
import { postRequest, putRequest } from '../../lib/requests';
import { standardError } from '../../lib/alerts';
import PropTypes from 'prop-types';
import StudentPersonalDetailsForm from '../../components/Form/StudentPersonalDetailsForm';

class StudentPersonalDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleCreateStudent = this._handleCreateStudent.bind(this);
    this._handleUpdateStudent = this._handleUpdateStudent.bind(this);
    this.state = {
      course_id: this.props.navigation.state.params.course_id,
      newStudent: this.props.navigation.state.params.newStudent,
      navbarColor: this.props.navigation.state.params.navbarColor,
      parentKey: this.props.navigation.state.params.parentKey,
    }
  }

  _handleUpdateStudent(params) {
    const studentId = this.props.navigation.state.params.student.id;
    const successFunc = (responseData) => {
      this.props.navigation.navigate('StudentProfile', {
        studentId: studentId,
        courseId: this.state.course_id,
        navbarColor: this.state.navbarColor,
      });
    }
    putRequest(APIRoutes.getStudentPath(studentId),
      successFunc, standardError, params=params);
  }

  _handleCreateStudent(params) {
    this.props.navigation.navigate('StudentContactInfo', {
      course_id: this.state.course_id,
      navbarColor: this.state.navbarColor,
      newStudent: this.state.newStudent,
      savedFields: params,
      parentKey: this.state.parentKey,
    });
  }

  render() {
    if (this.state.newStudent) {
      return (
        <View>
        <StudentPersonalDetailsForm
          newStudent={this.state.newStudent}
          onSaveStudent={this._handleCreateStudent} />
        </View>
      );
    } else {
      const navProps = this.props.navigation.state.params.student;
      return (
         <View>
         <StudentPersonalDetailsForm
            first_name={navProps.first_name}
            last_name={navProps.last_name}
            birthday={navProps.birthday}
            nickname={navProps.nickname}
            is_active={navProps.is_active}
            sex={navProps.sex}
            newStudent={this.state.newStudent}
            onSaveStudent={this._handleUpdateStudent}
            />
         </View>
      )
    }
  }
}

export default StudentPersonalDetailsScreen;
