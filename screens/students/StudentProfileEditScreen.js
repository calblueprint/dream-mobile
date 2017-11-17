import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import EditStudentForm from '../../components/Form/EditStudentForm'
import { postRequest, putRequest } from '../../lib/requests';
import { standardError } from '../../lib/request_callbacks';

class StudentProfileEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this._onSuccess = this._onSuccess.bind(this);
    this.state = {
    }
  }

  /*
   * Displays success toaster and navigates back to previous screen.
   */
  _onSuccess(response) {
    this.props.navigation.state.params.refreshStudents();
    this.props.navigation.goBack(null);
  }

  /*
   * Make request to create the course, and refresh the courses page.
   */
  _handleCreateStudent(params) {
    postRequest(APIRoutes.getStudentsPath(), this._onSuccess, standardError, params=params);
  }

  /*
   * Make request to save attributes of the course, and return to course page.
   */
  _handleUpdateStudent(params) {
    student_id = this.props.navigation.state.params.student_id;
    putRequest(APIRoutes.getStudentPath(student_id), this._onSuccess, standardError, params=params);
  }

  render() {
    const navProps = this.props.navigation.state.params;
    if (navProps.newStudent) {
      return (
        <EditStudentForm
          onSaveStudent={this._handleCreateStudent.bind(this)} />
      );
    } else {
      return (
        <View>
          <EditStudentForm
            onSaveStudent={this._handleUpdateStudent.bind(this)}
            first_name={navProps.first_name}
            last_name={navProps.last_name}
            birthday={navProps.birthday}
            year={navProps.year}
            address={navProps.address}
            nickname={navProps.nickname}
            primary_contact={navProps.primary_contact}
            primary_contact_relationship={navProps.primary_contact_relationship}
            primary_contact_phone={navProps.primary_contact_phone}
            primary_contact_phone2={navProps.primary_contact_phone2} />
        </View>
      );
    }
  }
}

export default StudentProfileEditScreen;
