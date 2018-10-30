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
      navbarColor: this.props.navigation.state.params.navbarColor,
      newStudent: this.props.navigation.state.params.newStudent,
      savedFields: this.props.navigation.state.params.savedFields,
      parentKey: this.props.navigation.state.params.parentKey,
    }
  }

  _handleUpdateStudent(params) {
    const studentId = this.props.navigation.state.params.student.id;
    const successFunc = (responseData) => {
      this.props.navigation.navigate('StudentProfile', {
        refreshStudents: this.props.navigation.state.params.refreshStudents,
        studentId: studentId,
        courseId: this.state.course_id,
        navbarColor: this.state.navbarColor,
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
      navbarColor: this.state.navbarColor,
      newStudent: this.state.newStudent,
      savedFields: joined,
      parentKey: this.state.parentKey,
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
            direccion__c={navProps.direccion__c}
            contacto_primario_name__c={navProps.contacto_primario_name__c}
            contacto_primario_phone__c={navProps.contacto_primario_phone__c}
            usuario_de_facebook__c={navProps.usuario_de_facebook__c}
            phone_number_1__c={navProps.phone_number_1__c}
            phone_number_2__c={navProps.phone_number_2__c}
            email__c={navProps.email__c}
            newStudent={this.state.newStudent}
            onSaveStudent={this._handleUpdateStudent}
            />
         </View>
      )
    }
  }
}

export default StudentContactInfoScreen;
