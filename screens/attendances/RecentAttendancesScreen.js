import React from 'react';
import { Image, Button, Text, View, ScrollView, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { commonStyles } from '../../styles/styles';
import { textStyles } from '../../styles/textStyles';
import { APIRoutes } from '../../config/routes';
import settings from '../../config/settings';
import { getRequest, postRequestNoCatch } from '../../lib/requests';
import AttendanceDateCard from '../../components/AttendanceDateCard/AttendanceDateCard';
import SimpleModal from '../../components/SimpleModal';
import { standardError } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';

class RecentAttendancesScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleSelectDate = this._handleSelectDate.bind(this);
  }

  /**
    * Method passed to DateCard to open attendance screen for attendance with given date.
    */
    _handleSelectDate(date) {
      var courseId = this.props.navigation.state.params.courseId
      this.props.navigation.navigate('Attendances', {
        courseId: courseId,
        date: date,
      });
    }

  /**
    * Renders AttendanceCard for each attendance object
    */
  _renderAttendances() {
    //TODO: (Aivant) ensure that this only renders latest 5 (poses question of what the best structure is...)
    return Object.keys(this.props.attendances).map((date, i) => {
      return(
        <AttendanceDateCard key={i}
          date={date}
          onSelectDate={(date) => {this._handleSelectDate(date)}}
          />
      );
    });
  }

  /**
    * Renders date, course title, attendance cards, and submit button
    */
  _renderLoadedView() {
    const { navigate } = this.props.navigation;
    //TODO: make sure you can only go to past_attendances when you're online
    const attendances = this._renderAttendances();
    return(
      <View>
        <Text style={textStyles.titleLarge}>Recent</Text>
        { attendances }
        <StyledButton
          onPress={() => navigate('PastAttendances',
            { course: this.props.course})}
          text="View By Month"
          primaryButtonLarge
        />
      </View>

    )
  }

  /**
    * Renders loading state if data is still loading or uses _renderLoadedView
    */
  render() {
    const attendances = this._renderLoadedView();
    return (
      <View style={commonStyles.containerStatic}>
        { attendances }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Either change styles or generalize to AttendanceSummaryScreen too
  attendancesContainer: {
    marginRight: 16,
    marginLeft: 24,
  },
});
// TODO (Kelsey): Add PropTypes from navigation


const mapStateToProps = (state, props) => {
  console.log("Mapping state to props for recent attendances screen");
  // Get course and date associated with this attendance screen
  const course = state.courses.find((course) => course.id === props.navigation.state.params.courseId);
  // Take the last 5 attendances only
  var attendances = course.attendances ? course.attendances : {},
  lastKeys = Object.keys(attendances).sort((a, b) => {return ( a > b ) - ( a < b );}).slice(-5).reverse();
  var latestAttendances = {};
  lastKeys.forEach((key) => {latestAttendances[key] = attendances[key]});
  return {
    attendances: latestAttendances,
    //online: offline.online, //TODO: add and implement
  };
}


export default connect(mapStateToProps, null)(RecentAttendancesScreen);
