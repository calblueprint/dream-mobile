import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';

/**
 * @prop onSaveCourse - callback function when course create form is submitted
 */
class EditCourseForm extends React.Component {
  constructor(props) {
    super(props);
    this._timeFormat = this._timeFormat.bind(this);
    this.state = {
      is_active: this.props.is_active,
      title: this.props.title || '',
      teacher_id1: this.props.teacher1 || '',
      teacher_id2: this.props.teacher2 || '',
      weekday: this.props.weekday || '',
      start_time: this.props.start_time || '',
      end_time: this.props.end_time || '',
      start_date: this.props.start_date || '',
      end_date: this.props.end_date || '',
    }
  }

  /*
   * Update component state each time a form field changes.
   */
  _handleFormChange(courseData){
    this.setState({ ...courseData });

    const today = new Date();
    if (this.state.end_date && this.state.end_date < today) {
      this.setState({ is_active: false })
    } else {
      this.setState({ is_active: true })
    }
  }

  /*
   * Scroll to form field that is currently selected.
   */
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
    const today = new Date();
    const minDate = new Date(today.getFullYear()-2, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear()+2, today.getMonth(), today.getDate());
    return (
      <View>
        <Form
          ref='registrationForm'
          onChange={this._handleFormChange.bind(this)}
          label="Personal Information">
          <InputField
            ref='title'
            label='Course Title'
            value={this.state.title}
            placeholder='e.g. Montessori'/>

          <InputField
            ref='teacher_id1'
            label='Teacher ID 1'
            value={this.state.teacher_id1}
            placeholder='e.g. 19322372'/>

          <InputField
            ref='teacher_id2'
            label='Teacher ID 2'
            value={this.state.teacher_id2}
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
            value={this.state.weekday}
            label='Select Day'/>

          <TimePickerField
            ref='start_time'
            dateTimeFormat={this._timeFormat}
            date={this.state.start_time}
            placeholder='Session Start'/>

          <TimePickerField
            ref='end_time'
            dateTimeFormat={this._timeFormat}
            date={this.state.end_time}
            placeholder='Session End'/>

          <DatePickerField
            ref='start_date'
            minimumDate={minDate}
            maximumDate={maxDate}
            mode="date"
            date={this.state.start_date}
            placeholder='Start Date'/>

          <DatePickerField
            ref='end_date'
            minimumDate={minDate}
            maximumDate={maxDate}
            mode='date'
            date={this.state.end_date}
            placeholder='End Date'/>
        </Form>
        <Button
          onPress={() => this.props.onSaveCourse({ course: this.state })}
          title='Save'
        />
      </View>
    );

  }
}

export default EditCourseForm;
