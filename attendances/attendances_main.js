import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class AttendancesScreen extends React.Component {

  static navigationOptions = {
    title: 'Attendances',
  };

  constructor(props) {
    super(props);
    this._fetchAttendances = this._fetchAttendances.bind(this);
    this._renderAttendances = this._renderAttendances.bind(this);
    this.state = {
      attendances : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchAttendances();
  }

  _fetchAttendances() {
    // TODO : Fix URL
    fetch('http://127.0.0.1:3000/api/attendances', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
      .then(function(response) {
        return response.json();
      })
      .then(function(responseData) {
        this.setState({ attendances: responseData, isLoading: false });
      }.bind(this))
      .catch(function(error) {
        console.error(error);
      });
  }

  _renderAttendances() {
    return this.state.attendances.map(function(attendance, i) {
      return(
        <View key={i}>
          <Text>Student: {attendance.student_id} Course: {attendance.course_id} Date: {attendance.date} Status: {attendance.attendance_type} </Text>
        </View>
      );
    });
  }

  render() {
    let attendances;
    if (this.state.isLoading) {
      // TODO (casey): Add loading gif.
      attendances = (
        <Text>Loading...</Text>
      )
    } else {
      attendances = this._renderAttendances()
    }
    return (
      <View style={attendanceStyles.container}>
        { attendances }
      </View>
    );

  }
}

const attendanceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});