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

import { monthYearDate } from '../../lib/date';


class PastAttendancesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId : this.props.navigation.state.params.courseId,
      //date: monthYearDate(new Date()), // Later, use this to start at current month
      date: "October 2017", // To hard-code in date, use this line.
      isLoading: true,
      attendances: [],
    };

    this._fetchAttendances = this._fetchAttendances.bind(this);
  }

  componentDidMount() {
    this._fetchAttendances();
  }

  _fetchAttendances() {
    const successFunc = (responseData) => {
      this.setState({ attendances: responseData, isLoading: false });
    }
    params = { date: this.state.date }
    getRequest(APIRoutes.getMonthAttendancesPath(this.state.courseId), successFunc, standardError, params);
  }

  /**
    * Method passed to DateCard to open attendance screen for attendance with given date.
    */
  _handleSelectDate(date) {
    //Assure that selected attendance is in the store.
    console.log("About to save attendance");
    this.props.saveAttendance(this.state.attendances[date], this.state.courseId, date);
    console.log("Selecting date!");
    this.props.navigation.navigate('Attendances', {
      courseId: this.state.courseId,
      attendances: this.state.attendances[date],
      date: date,
    });
  }

  /**
    * Renders AttendanceCard for each attendance object
    */
  _renderAttendances() {
    if (Object.keys(this.state.attendances).length == 0) {
      return (<Text style={textStyles.titleMedium}>No attendances for this month. Try another!</Text>)
    }
    return Object.keys(this.state.attendances).map((date, i) => {
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
    const attendances = this._renderAttendances();
    return(
      <View>
        <Text style={textStyles.titleLarge}>{this.state.date}</Text>
        { attendances }
      </View>

    )
  }
  /**
    * Renders loading state if data is still loading or uses _renderLoadedView
    */
  render() {
    const attendances = this.state.isLoading ? (<Image style={commonStyles.icon}
                        source={require('../../icons/spinner.gif')}/>) : this._renderLoadedView();
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

const saveAttendance = (attendances, courseId, date) => {
  console.log("Saving attendance");
  return (dispatch) => {
    console.log("Dispatching");
    dispatch(actions.receiveAttendancesSuccess(attendances, courseId, date));
    console.log("Finished dispatching");
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAttendance: (attendances, courseId, date) => dispatch(saveAttendance(attendances, courseId, date)),
  }
}

export default connect(null, mapDispatchToProps)(PastAttendancesScreen);
