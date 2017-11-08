import React from 'react';
import { Button, Text, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/request_callbacks';

class StudentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchStudents = this._fetchStudents.bind(this);
    this._renderStudents = this._renderStudents.bind(this);

    this.state = {
      students : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchStudents();
  }

  _fetchStudents() {
    const successFunc = (responseData) => {
      this.setState({ students: responseData, isLoading: false });
    }
    getRequest(APIRoutes.getStudentsPath(), successFunc, standardError);
  }

  _renderStudents() {
    return this.state.students.map(function(student, i) {
      return(
        <View key={i}>
          <Text>{student.id} {student.first_name} {student.last_name}</Text>
        </View>
      );
    });
  }

  render() {

    let students;
    if (this.state.isLoading) {
      // TODO: Add loading gif.
      students = (
        <Text>Loading...</Text>
      )
    } else {
      students = this._renderStudents()
    }
    return (
      <View style={commonStyles.container}>
        { students }
      </View>
    );

  }
}

export default StudentsScreen;
