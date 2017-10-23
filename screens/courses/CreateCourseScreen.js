import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import CreateCourseForm from '../../components/Form/CreateCourseForm'
import { postRequest } from '../../lib/requests';

class CreateCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {}
    }
  }

  _handleCreateCourse(params) {
    params.is_active = true;

    const successFunc = (responseData) => {
      this.setState({ course: responseData});
      this.props.navigation.state.params.refreshCourses();
      this.props.navigation.goBack(null);
    }
    const errorFunc = (error) => {
      console.error(error);
    }
    postRequest(APIRoutes.getCoursesPath(), successFunc, errorFunc, params=params);
  }


  render() {
    return (
      <CreateCourseForm
        onCreateCourse={this._handleCreateCourse.bind(this)} />
    );
  }
}

export default CreateCourseScreen;
