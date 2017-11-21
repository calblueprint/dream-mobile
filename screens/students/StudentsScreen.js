import React from 'react';
import { Button, Text, View, ScrollView, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { cardStyles } from '../../components/Form/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';

class StudentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this._fetchStudents = this._fetchStudents.bind(this);
    this._renderStudents = this._renderStudents.bind(this);
    this._fetchStudent = this._fetchStudent.bind(this);

    this.state = {
      students : { },
      isLoading : true,
      courseId: this.props.navigation.state.params.courseId,
    }
  }

  componentDidMount() {
    this._fetchStudents(this.state.courseId);
  }

  _fetchStudents() {
    const successFunc = (responseData) => {
      this.setState({ students: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO: Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getStudentsPath(this.state.courseId), successFunc, errorFunc);
  }

  _fetchStudent(studentId) {
    const { navigate } = this.props.navigation;
    const successFunc = (responseData) => {
      this.setState({ students: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO: Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getStudentPath(studentId), successFunc, errorFunc);
  }

  _renderStudents() {
    const { navigate } = this.props.navigation;
    return this.state.students.map(function(student, i) {
      return(
        <View key={i}>
            <Button
            onPress={() => navigate('StudentProfile', {refreshStudents: this._fetchStudent,
                                                       studentId: student.id})}
            title={student.first_name + " " + student.last_name}
            />
        </View>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
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
        <Button
          onPress={() => navigate('CreateStudent', {refreshStudents: this._fetchStudents,
                                                    courseId: this.state.courseId,
                                                    teacherId: 1})}
          title="Create Student"
        />
        { students }
      </View>
    );

  }
}

export default StudentsScreen;
