import React from 'react';
import { Image, View, Text, StyleSheet, Button } from 'react-native';
import { Form, PickerField, TimePickerField } from 'react-native-form-generator';
import { timeFormat } from '../../lib/datetime_formats';
import styles from './styles'
import { textStyles } from '../../styles/textStyles';
import StyledButton from '../Button/Button';

/**
 * @prop weekday - session weekday
 * @prop start_time - session start time
 * @prop end_time - session end time
 * @prop number - session number in list (determines order of sessions shown)
 * @prop onSessionChange - callback function when session fields are changed
 * @prop onSessionDelete - callback function to delete a session
 */
class Session extends React.Component {
  constructor(props) {
    super(props);
    this._handleSessionChange = this._handleSessionChange.bind(this);
    this._renderDeleteSessionButton = this._renderDeleteSessionButton.bind(this);
    this.state = {
    }
  }

  /*
   * Call the onSessionChange callback. Pass in the session number and field value.
   */
  _handleSessionChange(session) {
    session.modified = true;
    this.props.onSessionChange(session, this.props.number);
  }

  /*
   * Return the button to delete the session.
   */
  _renderDeleteSessionButton() {
    return (
      <StyledButton
        onPress={() => this.props.onSessionDelete(this.props.number)}
        text='Delete Session'
        clearButtonSmall>
      </StyledButton>
    );
  }

  render() {
    return (
      <View>
        <Form
          ref='sessionForm'
          onChange={this._handleSessionChange}>

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
            value={this.props.weekday}
            label='Select Day'/>

          <TimePickerField
            ref='start_time'
            dateTimeFormat={timeFormat}
            date={this.props.start_time}
            placeholder='Session Start'/>

          <TimePickerField
            ref='end_time'
            dateTimeFormat={timeFormat}
            date={this.props.end_time}
            placeholder='Session End'/>

          { this._renderDeleteSessionButton() }
        </Form>
      </View>
    );
  }
}

export default Session;
