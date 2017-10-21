import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';

/**
 * @prop onCreateCourse - callback function when course create form is submitted
 */
export class CreateCourseScreen extends React.Component {

  constructor(props) {
    super(props);
    this._timeFormat = this._timeFormat.bind(this);
    this.state = {
      courseData: {}
    }
  }

  _handleFormChange(courseData){
    //formData will be a json object that will contain refs of every field
    this.setState({courseData : courseData});
  }

  _handleFormFocus(event, reactNode) {
   this.refs.scroll.scrollToFocusedInput(event, reactNode);
  }

  /* Display time in HH:MM AM/PM format. */
  _timeFormat(date, mode) {
    if(!date) return "";
    let value=date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return value;
  }

  render() {
    const { navigate } = this.props.navigation;
    const today = new Date();
    const maxDate = new Date(today.getFullYear()+2, today.getMonth(), today.getDate());
    return (
      <Form
        ref='registrationForm'
        onChange={this._handleFormChange.bind(this)}
        label="Personal Information">
        <InputField
          ref='course_title'
          label='Course Title'
          placeholder='e.g. Montessori'/>

        <InputField
          ref='teacher_1'
          label='Teacher ID 1'
          placeholder='e.g. 19322372'/>

        <InputField
          ref='teacher_2'
          label='Teacher ID 2'
          placeholder='e.g. 12634669'/>

        <PickerField
          ref='weekday'
          options={{
            'sun': 'Sunday',
            'mon': 'Monday',
            'tue': 'Tuesday',
            'wed': 'Wednesday',
            'thu': 'Thursday',
            'fri': 'Friday',
            'sat': 'Saturday',
          }}
          placeholder='Select Day'/>

        <TimePickerField
          ref='start_time'
          dateTimeFormat={this._timeFormat}
          placeholder='Session Start'/>

        <TimePickerField
          ref='end_time'
          dateTimeFormat={this._timeFormat}
          placeholder='Session End'/>

        <DatePickerField
          ref='start_date'
          minimumDate={today}
          maximumDate={maxDate}
          mode="date"
          placeholder='Start Date'/>

        <DatePickerField
          ref='end_date'
          minimumDate={today}
          maximumDate={maxDate}
          mode='date'
          placeholder='End Date'/>

        <Button
          // onPress={this.props.navigation.state.params.onCreateCourse}
          title='Create Course'
        />
      </Form>
    );

  }
}