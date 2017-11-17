import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import CreateStudentForm from '../../components/Form/CreateStudentForm'
import { getRequest, postRequest, putRequest } from '../../lib/requests';

class CreateStudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      courseId: this.props.navigation.state.params.courseId,
      teacherId: this.props.navigation.state.params.teacherId,
    }
  }

  _handleCreateStudent(params) {
    params.course_id = this.state.courseId;
    params.teacher_id = this.state.teacherId;

    const successFunc = (responseData) => {
      this.setState({ student: responseData});
      this.props.navigation.state.params.refreshStudents();
      this.props.navigation.goBack(null);
    }
    const errorFunc = (error) => {
      console.error(error);
    }
    postRequest(APIRoutes.getStudentsPath(this.state.courseId), successFunc, errorFunc, params);
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <CreateStudentForm
        onCreateStudent={this._handleCreateStudent.bind(this)} />
    );
  }
}

export default CreateStudentScreen;
