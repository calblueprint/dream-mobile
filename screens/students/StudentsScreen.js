import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { styles } from '../../styles/styles';
import { cardStyles } from '../../components/StudentCard/styles';
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
      // TODO: Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getStudentsPath(), successFunc, errorFunc);
  }

  _renderStudents() {
    const { navigate } = this.props.navigation;
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
      <View style={styles.container}>
        <Button
          onPress={() => navigate('CreateStudent', {refreshStudents: this._fetchStudents})}
          title="Create Student"
        />
        { students }
      </View>
    );

  }
}

export default StudentsScreen;
