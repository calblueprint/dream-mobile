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
    this.state = {
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
    course_id = this.props.navigation.state.params.course_id;
    putRequest(APIRoutes.getCoursePath(course_id), this._onSuccess, standardError, params=params);
  }

  render() {
    const navProps = this.props.navigation.state.params;
    if (navProps.newCourse) {
      return (
        <EditCourseForm
          onSaveCourse={this._handleCreateCourse.bind(this)} />
      );
    } else {
      return (
        <View>
          <EditCourseForm
            onSaveCourse={this._handleUpdateCourse.bind(this)}
            is_active={navProps.is_active}
            title={navProps.title}
            teacher1={navProps.teacher1}
            teacher2={navProps.teacher2}
            weekday={navProps.weekday}
            start_time={navProps.start_time}
            end_time={navProps.end_time}
            start_date={navProps.start_date}
            end_date={navProps.end_date} />
        </View>
      );
    }
  }
}

export default EditCourseScreen;
