import React from 'react';
import { Button, Text, TouchableHighlight, View } from 'react-native';
import StyledButton from '../../components/Button/Button';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import { cardStyles } from './styles';
import { textStyles } from '../../styles/textStyles';
import colors from '../../styles/colors';
import I18n from '../../lib/i18n/i18n';


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
    const colorList = {
      0: colors.courseGreen,
      1: colors.courseBlue,
      2: colors.coursePurple,
      3: colors.coursePink,
      4: colors.courseBrown
    }
    const colorKey = this.props.index % 5

    return (
      <TouchableHighlight onPress={() => this.props.onSelectCourse(this.props.course_id)}>
        <View style={[cardStyles.outerContainer, {backgroundColor: colorList[colorKey]}]}>
          <View style={cardStyles.topContainer}>
            <Text style={[cardStyles.title, textStyles.titleMediumLight]}>{this.props.title}</Text>
            <Text style={[cardStyles.count, textStyles.titleSmallLight]}>5 {I18n.t('students', {locale: this.props.locale})}</Text>
          </View>
          <View style={cardStyles.bottomContainer}>
            <StyledButton
              onPress={() => this.props.onTakeAttendance(this.props.course_id, this.props.title)}
              text={I18n.t('takeattendance', {locale: this.props.locale})}
              clearButtonSmall>
            </StyledButton>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default CourseCard;
