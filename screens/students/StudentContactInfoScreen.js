import React from 'react';
import { View } from 'react-native';
import { APIRoutes } from '../../config/routes';
import { postRequest, putRequest } from '../../lib/requests';
import { standardError } from '../../lib/alerts';
import PropTypes from 'prop-types';
import StudentContactInfoForm from '../../components/Form/StudentContactInfoForm';

class StudentContactInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleCreateStudent = this._handleCreateStudent.bind(this);
    this._handleUpdateStudent = this._handleUpdateStudent.bind(this);
    this.state = {
      course_id: this.props.navigation.state.params.course_id,
      newStudent: this.props.navigation.state.params.newStudent,
      savedFields: this.props.navigation.state.params.savedFields
    }
  }

  _handleUpdateStudent(params) {
    const studentId = this.props.navigation.state.params.student.id;
    const successFunc = (responseData) => {
      this.props.navigation.navigate('StudentProfile', {
        refreshStudents: this.props.navigation.state.params.refreshStudents,
        studentId: studentId,
        courseId: this.state.course_id,
      });
    }
    putRequest(APIRoutes.getStudentPath(studentId), 
      successFunc, standardError, params=params);
  }

  _handleCreateStudent(params) {
    const old = this.state.savedFields;
    const joined = Object.assign({}, old, params);
    this.props.navigation.navigate('StudentExtraInfo', {
      course_id: this.state.course_id,
      newStudent: this.state.newStudent,
      savedFields: joined,
      refreshStudents: this.props.navigation.state.params.refreshStudents,
    });
  }

  render() {
    if (this.state.newStudent) {
      return (
        <View>
        <StudentContactInfoForm
          newStudent={this.state.newStudent}
          onSaveStudent={this._handleCreateStudent} />
        </View>
      );
    } else {
      const navProps = this.props.navigation.state.params.student;
      return (
         <View>
         <StudentContactInfoForm
            address={navProps.address}
            primary_contact={navProps.primary_contact}
            primary_contact_phone={navProps.primary_contact_phone}
            facebook_name={navProps.facebook_name}
            phone={navProps.phone}
            phone_2={navProps.phone_2}
            email={navProps.email}
            newStudent={this.state.newStudent}
            onSaveStudent={this._handleUpdateStudent} 
            />
         </View>
      )
    }
  }
}

export default StudentContactInfoScreen;
