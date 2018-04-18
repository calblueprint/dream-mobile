import React from 'react';
import { Image, Button, Text, View, ScrollView, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import moment from 'moment';
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
    today = new Date();
    this.state = {
      courseId : this.props.navigation.state.params.courseId,
      date: new Date(today.getFullYear(), today.getMonth(), 1),
      isLoading: true,
      attendances: [],
    };

    this._fetchAttendances = this._fetchAttendances.bind(this);
    this.decrementMonth = this.decrementMonth.bind(this);
    this.incrementMonth = this.incrementMonth.bind(this);
  }

  componentDidMount() {
    this._fetchAttendances();
  }

  decrementMonth() {
    newDate = moment(this.state.date).subtract(1, "months").valueOf();
    this.setState({ date: newDate }, () => {
      this._fetchAttendances();
    });
  }

  incrementMonth() {
    newDate = moment(this.state.date).add(1, "months").valueOf();
    this.setState({ date: newDate }, () => {
      this._fetchAttendances();
    });
  }

  _fetchAttendances() {
    const successFunc = (responseData) => {
      this.setState({ attendances: responseData, isLoading: false });
    }
    params = { date: monthYearDate(this.state.date)}
    getRequest(APIRoutes.getMonthAttendancesPath(this.state.courseId), successFunc, standardError, params);
  }

  /**
    * Method passed to DateCard to open attendance screen for attendance with given date.
    */
  _handleSelectDate(date) {
    //Assure that selected attendance is in the store.
    this.props.saveAttendance(this.state.attendances[date], this.state.courseId, date);
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
      <View style={{flexDirection: 'column', flex: 1, justifyContent:'flex-start'}}>
        <View style={{flex: 0.08, marginTop: 24, marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#E6E6E6'}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 0.33}}>
              <StyledButton
                onPress={this.decrementMonth}
                text="Prev"
                linkButton
              />
            </View>
            <View style={{flex: 0.33}}>
              <Text style={textStyles.titleLarge}>{monthYearDate(this.state.date)}</Text>
            </View>
            <View style={{flex: 0.33}}>
              <StyledButton
                onPress={this.incrementMonth}
                text="Next"
                linkButton
              />
            </View>
          </View>
        </View>
        <View style={{flex: 0.92}}>
          <ScrollView>
            { attendances }
          </ScrollView>
        </View>
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
  return (dispatch) => {
    dispatch(actions.receiveAttendancesSuccess(attendances, courseId, date));
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAttendance: (attendances, courseId, date) => dispatch(saveAttendance(attendances, courseId, date)),
  }
}

export default connect(null, mapDispatchToProps)(PastAttendancesScreen);
