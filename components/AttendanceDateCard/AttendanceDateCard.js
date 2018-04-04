import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { textStyles } from '../../styles/textStyles';

/**
 * @prop Attendance - attendance information
 * @prop onSelectAttendance - callback function to show attendance information
 */
class AttendanceDateCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onSelectAttendance()}>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#E6E6E6'}}>
          <View style={{marginBottom: 16, marginTop: 16}}>
            <Text style={textStyles.body}>{this.props.student.first_name} {this.props.student.last_name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default AttendanceDateCard;