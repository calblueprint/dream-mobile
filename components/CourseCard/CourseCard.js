import React from 'react';
import { Button, Text, TouchableHighlight, View } from 'react-native';
import StyledButton from '../../components/Button/Button';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import { cardStyles } from './styles';

/**
 * @prop course_id - course ID
 * @prop title - course title
 * @prop onSelectCourse - callback function to show course information
 * @prop onTakeAttendance - callback function to take attendance for today
 */
class CourseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onSelectCourse(this.props.course_id)}>
        <View style={cardStyles.container}>
          <Text style={cardStyles.title}>{this.props.course_id} {this.props.title}</Text>
          <StyledButton
            onPress={() => this.props.onTakeAttendance(this.props.course_id, this.props.title)}
            text='Take Attendance'
            clearButtonSmall>
          </StyledButton>
        </View>
      </TouchableHighlight>
    );
  }
}

export default CourseCard;
