import React from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import styles from './styles'
import Dropdown from '../Dropdown'

class AttendanceCard extends React.Component {
  /**
    * Render attendance option dropdown
    */
  renderSelect() {
    const options = {
      0: 'Present',
      1: 'Unexcused Absent',
      2: 'Excused Absent',
      3: 'Unexcused Late',
      4: 'Excused Late'
    }

    const optionsAbbrev = {
      0: 'Present',
      1: 'UA',
      2: 'EA',
      3: 'UL',
      4: 'EL'
    }

    const dropdownStyles = {
      style: styles.dropdownStyle
    }

    return(
      <Dropdown
        onSelect={this.props.setType(this.props.index)}
        value={this.props.attendance.attendance_type}
        defaultText={optionsAbbrev[this.props.attendance.attendance_type]}
        options={options}
        styles={dropdownStyles}
        />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.name}</Text>
        <View style={styles.leftContainer}>
          {this.renderSelect()}
          <TouchableHighlight
            style={styles.commentButton}
            onPress={() => this.props.setModal(this.props.index)}>
            <Text style={{fontSize: 10}}>Comment</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

AttendanceCard.propTypes = {
  attendance: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  setModal: React.PropTypes.func.isRequired,
  setType: React.PropTypes.func.isRequired,
};

export default AttendanceCard;
