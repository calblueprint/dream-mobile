import React from 'react';
import { Image, View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import styles from './styles'
import Dropdown from '../Dropdown'
import { textStyles } from '../../styles/textStyles';

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

    const optionsColor = {
      0: '#3BB273',
      1: '#E53935',
      2: '#E53935',
      3: '#FF8300',
      4: '#FF8300'
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
        optionsColor={optionsColor[this.props.attendance.attendance_type]}
        />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={textStyles.body}>{this.props.name}</Text>
        </View>
        <View style={styles.spaceContainer}>
        </View>
        <View style={styles.leftContainer}>
          {this.renderSelect()}
          <TouchableHighlight
            style={styles.commentButtonOuter}
            onPress={() => this.props.setModal(this.props.index, this.props.attendance.comment)}>
            <Image
              style={styles.commentButton}
              source={require('../../icons/comment.png')}
            />
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
