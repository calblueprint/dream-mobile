import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal, TouchableHighlight } from 'react-native';
import styles from './styles'
import Dropdown from '../Dropdown'

class AttendanceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
        onSelect={this.props.updateType(this.props.index)}
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
                onChangeText={this.props.updateComment(this.props.index)}
                value={this.props.attendance.comment}
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
