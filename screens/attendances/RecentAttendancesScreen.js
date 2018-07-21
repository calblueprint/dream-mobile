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
      var courseTitle = this.props.navigation.state.params.courseTitle
      this.props.navigation.navigate('Attendances', {
        courseId: courseId,
        courseTitle: courseTitle,
        attendances: this.props.attendances[date],
        date: date,
      });
    }

  /**
    * Renders AttendanceCard for each attendance object
    */
  _renderAttendances() {
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
    * Renders loading state if data is still loading or uses _renderLoadedView
    */
  render() {
    const { navigate } = this.props.navigation;
    //TODO: make sure you can only go to past_attendances when you're online
    const attendances = this._renderAttendances();
    const courseId = this.props.navigation.state.params.courseId
    return(
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Text style={[textStyles.titleLarge, {marginBottom: 8}]}>Recent</Text>
          { attendances }
        </View>
        <StyledButton
          onPress={() => navigate('PastAttendances',
            { courseId: courseId,
              courseTitle: this.props.navigation.state.params.courseTitle})}
          text="View By Month"
          primaryButtonLarge
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: '#fff',
    flex: 1
  },
  inner: {
    margin: 24,
    marginTop: 40,
  },
});

const mapStateToProps = (state, props) => {
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
