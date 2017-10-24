import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal, TouchableHighlight } from 'react-native';
import ModalPicker from 'react-native-modal-picker'

class AttendanceCard extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      { key: 0, label: 'Present' },
      { key: 1, label: 'Unexcused Absent' },
      { key: 2, label: 'Excused Absent' },
      { key: 3, label: 'Unexcused Late' },
      { key: 4, label: 'Excused Late' },
    ];
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
    this.setState({ attendance: attendance })
    this.props.updateAttendance(attendance)
  }

  setType(option) {
    const attendance = this.state.attendance
    attendance.attendance_type = option.key
    this.setState({attendance: attendance, attendanceLabel: option.label})
    this.props.updateAttendance(attendance)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.name}</Text>
        <ModalPicker
          data={this.data}
          initValue={this.state.attendanceLabel}
          onChange={this.setType.bind(this)}>

          <Text style={{borderWidth:1, borderColor:'#ccc', padding:5, height: 'auto', borderRadius: 4, margin: 4}} >
            {this.state.attendanceLabel}
          </Text>
        </ModalPicker>
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



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  picker: {
    width: 100,
  },
});

AttendanceCard.propTypes = {
  attendance: React.PropTypes.object,
  name: React.PropTypes.string,
};

export default AttendanceCard;