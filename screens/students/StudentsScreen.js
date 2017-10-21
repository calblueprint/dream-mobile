import React from 'react';
<<<<<<< af69bb41c7833329745606843d29941a63953e61
import { Button, Text, View } from 'react-native';
import { styles } from '../../config/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
=======
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { styles } from '../../config/styles';
>>>>>>> first commit

class StudentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchStudents = this._fetchStudents.bind(this);
<<<<<<< af69bb41c7833329745606843d29941a63953e61
    this._renderStudents = this._renderStudents.bind(this);
=======
    this._renderStudent = this._renderStudents.bind(this);
>>>>>>> first commit
    this.state = {
      students : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchStudents();
  }

  _fetchStudents() {
<<<<<<< af69bb41c7833329745606843d29941a63953e61
    const successFunc = (responseData) => {
      this.setState({ students: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO (caseytaka): Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getStudentsPath(), successFunc, errorFunc);
=======
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
>>>>>>> first commit
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
<<<<<<< af69bb41c7833329745606843d29941a63953e61
    let Students;
=======
    let students;
>>>>>>> first commit
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

<<<<<<< af69bb41c7833329745606843d29941a63953e61
export default StudentsScreen;
=======
export default StudentsScreen;
>>>>>>> first commit
