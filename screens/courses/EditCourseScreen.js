import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import EditCourseForm from '../../components/Form/EditCourseForm'
import { postRequest, putRequest } from '../../lib/requests';
import { standardError } from '../../lib/request_callbacks';

class EditCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this._onSuccess = this._onSuccess.bind(this);
    this._handleCreateCourse = this._handleCreateCourse.bind(this);
    this._handleUpdateCourse = this._handleUpdateCourse.bind(this);
    this._handleCreateSession = this._handleCreateSession.bind(this);
    this._handleUpdateSession = this._handleUpdateSession.bind(this);
    this.state = {
      course_id: this.props.navigation.state.params.course_id,
    }
  }

  /*
   * Displays success toaster and navigates back to previous screen.
   */
  _onSuccess(response) {
    this.props.navigation.state.params.refreshCourses();
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

  /*
   * Make request to add new session to course.
   */
  _handleCreateSession(params) {
    const successFunc = (responseData) => {
      console.log("New Session");
    }
    postRequest(APIRoutes.getSessionsPath(), successFunc, standardError, params=params);
  }

  /*
   * Make request to update a course session.
   */
  _handleUpdateSession(params) {
    putRequest(APIRoutes.getSessionPath(this.state.course_id), this._onSuccess, standardError, params=params);
  }

  render() {
    const navProps = this.props.navigation.state.params;
    if (navProps.newCourse) {
      return (
        <EditCourseForm
          sessionList={navProps.sessions}
          onSaveCourse={this._handleCreateCourse} />
      );
    } else {
      return (
        <View>
          <EditCourseForm
            is_active={navProps.is_active}
            title={navProps.title}
            teacher1={navProps.teacher1}
            teacher2={navProps.teacher2}
            start_date={navProps.start_date}
            end_date={navProps.end_date}
            sessionList={navProps.sessions}
            onSaveCourse={this._handleUpdateCourse} />
        </View>
      );
    }
  }
}

export default EditCourseScreen;
