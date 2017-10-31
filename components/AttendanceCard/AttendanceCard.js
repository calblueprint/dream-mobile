import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import styles from './styles'
import Dropdown from '../Dropdown'

class AttendanceCard extends React.Component {
  renderSelect() {
    const options = {
      0: 'Present',
      1: 'Unexcused Absent',
      2: 'Excused Absent',
      3: 'Unexcused Late',
      4: 'Excused Late'
    }

    const dropdownStyles = {
      style: styles.dropdownStyle
    }

    return(
      <Dropdown
        onSelect={this.props.setType(this.props.index)}
        value={this.props.attendance.attendance_type}
        defaultText={options[this.props.attendance.attendance_type]}
        options={options}
        styles={dropdownStyles}
        />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.name}</Text>
        {this.renderSelect()}
        <Button
          onPress={() => this.props.setModal(true, this.props.index)}
          title="Comment"
        />
      </View>
    )
  }
}

AttendanceCard.propTypes = {
  attendance: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
};

export default AttendanceCard;
