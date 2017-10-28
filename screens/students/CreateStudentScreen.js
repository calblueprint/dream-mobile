import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import CreateStudentForm from '../../components/Form/CreateStudentForm'
import { postRequest } from '../../lib/requests';

class CreateStudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {}
    }
  }

  _handleCreateStudent(params) {
    params.is_active = true;

    const successFunc = (responseData) => {
      this.setState({ student: responseData});
      this.props.navigation.state.params.refreshStudents();
      this.props.navigation.goBack(null);
    }
    const errorFunc = (error) => {
      console.error(error);
    }
    postRequest(APIRoutes.getStudentsPath(), successFunc, errorFunc, params=params);
  }


  render() {
    return (
      <CreateStudentForm
        onCreateStudent={this._handleCreateStudent.bind(this)} />
    );
  }
}

export default CreateStudentScreen;
