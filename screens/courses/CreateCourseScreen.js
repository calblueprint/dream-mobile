import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import EditCourseForm from '../../components/Form/EditCourseForm'
import CreateCourseForm from '../../components/Form/CreateCourseForm'
import { postRequest, putRequest, deleteRequest } from '../../lib/requests';
import { standardError } from '../../lib/alerts';

class CreateCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this._onSuccess = this._onSuccess.bind(this);
    this._handleCreateCourse = this._handleCreateCourse.bind(this);
    this._handleUpdateCourse = this._handleUpdateCourse.bind(this);
    this.state = {
      course_id: this.props.navigation.state.params.course_id,
    }
  }

  /*
   * Displays success toaster and navigates back to previous screen.
   */
  _onSuccess(response) {
    this.props.navigation.goBack(null);
  }

  /*
   * Make request to create the course, and refresh the courses page.
   */
  _handleCreateCourse(params) {
    postRequest(APIRoutes.getCoursesPath(), this._onSuccess, standardError, params=params);
  }

  /*
   * Make request to save attributes of the course, and return to course page.
   */
  _handleUpdateCourse(params) {
    putRequest(APIRoutes.getCoursePath(this.state.course_id), this._onSuccess, standardError, params=params);
  }

  render() {
    const navProps = this.props.navigation.state.params;
    return (
      <CreateCourseForm
        sessionList={navProps.sessions}
        onSaveCourse={this._handleCreateCourse} />
    );
  }
}

export default CreateCourseScreen;
