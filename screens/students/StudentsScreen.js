import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../../config/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

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
    const errorFunc = (error) => {
      // TODO (caseytaka): Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getStudentsPath(), successFunc, errorFunc);
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
    let Students;
    if (this.state.isLoading) {
      // TODO (casey): Add loading gif.
      students = (
        <Text>Loading...</Text>
      )
    } else {
      students = this._renderStudents()
    }
    return (
      <View style={styles.container}>
        { students }
      </View>
    );

  }
}

export default StudentsScreen;
