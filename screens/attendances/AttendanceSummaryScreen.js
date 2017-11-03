import React from 'react';
import { Button, Text, View, ScrollView, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

import { commonStyles } from '../../styles/styles';
import { APIRoutes } from '../../config/routes';
import settings from '../../config/settings';
import { getRequest, postRequest, putRequest } from '../../lib/requests';
import { attendanceDate } from '../../lib/date';
import AttendanceCard from '../../components/AttendanceCard';
import SimpleModal from '../../components/SimpleModal';

class AttendanceSummaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendances: this.props.navigation.state.params.attendances,
      students: this.props.navigation.state.params.students,
      isLoading: false,
      date: this.props.navigation.state.params.date,
      courseTitle: this.props.navigation.state.params.courseTitle,
    }
  }


  /**
    * Attempts to update each changed attendance and waits for each request to succeed
    * before navigating backwards or logging failure
    */
  _submitAttendances() {
    const attendances = this.state.attendances.map((attendance, i) => {
      return this._submitAttendance(attendance, i);
    });

    Promise.all(attendances).then((attendances) => {
      this.props.navigation.goBack();
    }).catch((error) => {
      console.log(error);
    });
  }

  /**
    * Makes put request to update given attendance if it has been changed
    */
  _submitAttendance(attendance, index) {
    const successFunc = (responseData) => {
      return responseData;
    }
    const errorFunc = (error) => {
      // TODO (Kelsey): address what happens when editing attendance fails
      console.log(error);
    }
    const params = attendance

    if (attendance.isChanged) {
      return putRequest(APIRoutes.attendancePath(), successFunc, errorFunc, params);
    }
  }

  /**
    * Renders date, course title, attendance cards, and submit button
    */
  _renderLoadedView() {
    return(
      <View>
        <ScrollView>
          <Text>{attendanceDate(this.state.date)}</Text>
          <Text>{this.state.courseTitle}</Text>
        </ScrollView>
      </View>
    )
  }

  /**
    * Renders loading state if data is still loading or uses _renderLoadedView
    */
  render() {
    // TODO (Kelsey): Add loading gif
    const view = this.state.isLoading ? (<Text>Loading...</Text>) : this._renderLoadedView();
    return (
      <View style={styles.container}>
        { view }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
// TODO (Kelsey): Add PropTypes from navigation

export default AttendanceSummaryScreen;
