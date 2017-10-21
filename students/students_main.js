import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class StudentsScreen extends React.Component {

  static navigationOptions = {
    title: 'Students',
  };

  constructor(props) {
    super(props);
    this._fetchStudents = this._fetchStudents.bind(this);
    this._renderStudent = this._renderStudents.bind(this);
    this.state = {
      students : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchStudents();
  }

  _fetchStudents() {
    // TODO (caseytaka): Fix URL
    fetch('http://127.0.0.1:3000/api/students', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
      .then(function(response) {
        return response.json();
      })
      .then(function(responseData) {
        this.setState({ students: responseData, isLoading: false });
      }.bind(this))
      .catch(function(error) {
        // TODO (caseytaka): Display correct toastr error msg
        console.error(error);
      });
  }

  _renderStudents() {
    return this.state.students.map(function(student, i) {
      return(
        <View key={i}>
          <Text>{student.id} {student.title}</Text>
        </View>
      );
    });
  }

  render() {
    let students;
    if (this.state.isLoading) {
      // TODO (casey): Add loading gif.
      students = (
        <Text>Loading...</Text>
      )
    } else {
      students = this._renderStudents()
    }
    return (
      <View style={studentStyles.container}>
        { students }
      </View>
    );

  }
}

const studentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});