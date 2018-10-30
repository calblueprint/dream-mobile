import React from 'react';
import { Button, Text, TouchableHighlight, View } from 'react-native';
import StyledButton from '../../components/Button/Button';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import { cardStyles } from './styles';
import { textStyles } from '../../styles/textStyles';
import colors from '../../styles/colors';
import { FontAwesome } from '@expo/vector-icons';
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
    const unsyncedAttendances = (
      <Text style={[cardStyles.count, textStyles.titleSmallLight]}>
        <FontAwesome name="exclamation-triangle" size={14} color={colors.iconLight}/> {I18n.t('unsyncedattendances', {locale: this.props.locale})}
      </Text>
    )
    let syncText = this.props.synced ? (I18n.t('lastsynced', {locale: this.props.locale}) + ": " + this.props.last_synced) : unsyncedAttendances
    return (
      <TouchableHighlight onPress={() => this.props.onSelectCourse(this.props.course_id, colorKey)}
      underlayColor='transparent'>
        <View style={[cardStyles.outerContainer, {backgroundColor: colorList[colorKey]}]}>
          <View style={cardStyles.topContainer}>
            <Text style={[cardStyles.title, textStyles.titleMediumLight]}>{this.props.title__c}</Text>
            <Text style={[cardStyles.count, textStyles.titleSmallLight]}>5 {I18n.t('students', {locale: this.props.locale})}</Text>
            <Text style={[cardStyles.count, textStyles.titleSmallLight]}>{syncText}</Text>

          </View>
          <View style={cardStyles.bottomContainer}>
            <StyledButton
              onPress={() => this.props.onTakeAttendance(this.props.course_id, this.props.title__c)}
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
