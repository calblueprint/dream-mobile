import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import { timeFormat } from '../../lib/time';
import StyledButton from '../Button/Button';
import Session from '../Session';

/**
 * @prop onSaveCourse - callback function when course create form is submitted
 * @prop refreshCourses - callback function to refresh CoursesScreen
 * @prop newCourse - true if creating new course, false if editing a course
 * @prop course_id - id of course
 * @prop is_active - true if course is ative (within the start and end date)
 * @prop title - course title
 * @prop teacher1 - dream_id of teacher 1
 * @prop teacher2 - dream_id of teacher 2
 * @prop start_date - start date of course
 * @prop end_date - end date of course
 * @prop sessionList - list of session records
 */
class EditCourseForm extends React.Component {
  constructor(props) {
    super(props);
    this._initializeSessionList = this._initializeSessionList.bind(this);
    this._initializeSession = this._initializeSession.bind(this);
    this._mapSessions = this._mapSessions.bind(this);
    this._addNewSession = this._addNewSession.bind(this);
    this._renderAddSessionButton = this._renderAddSessionButton.bind(this);
    this._handleFormChange = this._handleFormChange.bind(this);
    this.state = {
      is_active: this.props.is_active,
      title: this.props.title || '',
      teacher_id1: this.props.teacher1 || '',
      teacher_id2: this.props.teacher2 || '',
      start_date: this.props.start_date || '',
      end_date: this.props.end_date || '',
      sessionList: [],

      weekday: this.props.weekday || '',
      start_time: this.props.start_time || '',
      end_time: this.props.end_time || '',
    }
  }

  componentDidMount() {
    this._initializeSessionList();
  }

  /*
   * Parse sessionList from props to create state sessionList.
   */
  _initializeSessionList() {
    this.props.sessionList.map(this._initializeSession)
  }

  /*
   * Add individual session to state sessionList.
   */
  _initializeSession(session, index) {
    let stateSession = { ...session }
    stateSession.modified = false
    newSessionList = this.state.sessionList
    newSessionList.push(stateSession)
    this.setState({ sessionList: newSessionList })
  }

  /*
   * Map session to its view in the Course form.
   */
  _mapSessions(session, index) {
    return (
      <Session
        weekday    = {session.weekday}
        start_time = {session.start_time}
        end_time   = {session.end_time}
        key        = {session.id}
        number     = {index}
      />
    );
  }

  /*
   * Add new session to state sessionList
   */
  _addNewSession() {
  }

  /*
   * Return the add session button component.
   */
  _renderAddSessionButton() {
    return (
      <StyledButton
        onPress={this.state._addNewSession}
        text='Add Session'
        clearButtonSmall>
      </StyledButton>
    );
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

  render() {
    const today = new Date();
    const minDate = new Date(today.getFullYear()-2, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear()+2, today.getMonth(), today.getDate());

    // let sessions;
    // if (this.state.isLoading) {
    //   sessions = (
    //     <Text>Loading...</Text>
    //   )
    // } else {
    //   sessions = this.state.sessionList.map(this._mapSessions);
    // }

    return (
      <View>
        <Form
          ref='registrationForm'
          onChange={this._handleFormChange}
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

          <PickerField
            ref='weekday'
            options={{
              'Sunday': 'Sunday',
              'Monday': 'Monday',
              'Tuesday': 'Tuesday',
              'Wednesday': 'Wednesday',
              'Thursday': 'Thursday',
              'Friday': 'Friday',
              'Saturday': 'Saturday',
            }}
            value={this.state.weekday}
            label='Select Day'/>

          <TimePickerField
            ref='start_time'
            dateTimeFormat={timeFormat}
            date={this.state.start_time}
            placeholder='Session Start'/>

          <TimePickerField
            ref='end_time'
            dateTimeFormat={timeFormat}
            date={this.state.end_time}
            placeholder='Session End'/>

          { this._renderAddSessionButton() }
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
