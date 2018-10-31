import React from 'react';
import { Image, View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import styles from './styles'
import Dropdown from '../Dropdown'
import PropTypes from 'prop-types';
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

    const attendanceButtonStyles = {
      style: styles.attendanceButton
    }

    return(
      <Dropdown
        onSelect={this.props.setType(this.props.index)}
        value={this.props.attendance.attendance_type__c}
        defaultText={optionsAbbrev[this.props.attendance.attendance_type__c]}
        options={options}
        styles={attendanceButtonStyles}
        optionsColor={optionsColor[this.props.attendance.attendance_type__c]}
        />
    )
  }

  renderCommentButton(comment) {
    if (comment != null) {
      return (
        <Image
          style={styles.commentButton}
          source={require('../../icons/comment_active.png')}
        />
      )
    }
    return (
      <Image
        style={styles.commentButton}
        source={require('../../icons/comment.png')}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.name ? (
          <View style={styles.nameContainer}>
            <Text style={textStyles.body}>{this.props.name}</Text>
          </View>
        ) : (
          <View style={styles.nameContainer}>
            <Text style={textStyles.body}>{this.props.attendance.student_name__c}</Text>
          </View>
        )}
        <View style={styles.spaceContainer}>
        </View>
        <View style={styles.leftContainer}>
          {this.renderSelect()}
          <TouchableHighlight
            style={styles.commentButtonOuter}
            onPress={() => this.props.setModal(this.props.index, this.props.attendance.notes__c)}
            underlayColor='transparent'>
            {this.renderCommentButton(this.props.attendance.notes__c)}
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

AttendanceCard.propTypes = {
  attendance: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setModal: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};

export default AttendanceCard;
