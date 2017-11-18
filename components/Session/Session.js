import React from 'react';
import { Image, View, Text, StyleSheet, Button } from 'react-native';
import { Form, PickerField, TimePickerField } from 'react-native-form-generator';
import styles from './styles'
import { textStyles } from '../../styles/textStyles';
import { timeFormat } from '../../lib/time';

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <Form
          ref='sessionForm'
          onChange={() => console.log("Changed session")}>

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
        </Form>
      </View>
    );
  }
}

export default Session;
