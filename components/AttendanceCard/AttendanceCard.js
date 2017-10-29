import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal, TouchableHighlight } from 'react-native';
import styles from './styles'
import Dropdown from '../Dropdown'

class AttendanceCard extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
      0: 'Present',
      1: 'Unexcused Absent',
      2: 'Excused Absent',
      3: 'Unexcused Late',
      4: 'Excused Late'
    }
    this.state = {
      attendance: this.props.attendance,
      attendanceLabel: this.data.find((item) => item.key === this.props.attendance.attendance_type).label,
      modalVisible: false
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setComment(comment) {
    const attendance = this.state.attendance
    attendance.comment = comment
    attendance.isChanged = true
    this.setState({ attendance: attendance })
    this.props.updateAttendance(attendance, this.props.index)
  }

  setType(value, label) {
    const attendance = this.state.attendance
    attendance.attendance_type = value
    attendance.isChanged = true
    this.setState({attendance: attendance, attendanceLabel: label})
    this.props.updateAttendance(attendance, this.props.index)
  }

  renderSelect() {
    const options = {
      0: 'Present',
      1: 'Unexcused Absent',
      2: 'Excused Absent',
      3: 'Unexcused Late',
      4: 'Excused Late'
    }

    return(
      <Dropdown
        onSelect={this.setType.bind(this)}
        value={this.props.attendance.attendance_type}
        defaultText={options[this.props.attendance.attendance_type]}
        options={options}
        />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.name}</Text>
        {this.renderSelect()}
        <Button onPress={() => this.setModalVisible(true)}
          title="Comment"
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={{marginTop: 22}}>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={this.setComment.bind(this)}
                value={this.state.attendance.comment}
              />
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </Modal>
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
