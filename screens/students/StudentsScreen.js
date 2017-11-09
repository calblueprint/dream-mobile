import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { styles } from '../../styles/styles';
import { cardStyles } from '../../components/Form/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

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
      studentId: this.props.navigation.state.params.studentId,
    }
  }

  componentDidMount() {
    this._fetchStudents(this.state.courseId);
  }

  _fetchStudents(courseId) {
    const successFunc = (responseData) => {
      this.setState({ students: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      // TODO: Display correct toastr error msg
      console.error(error);
    }
    getRequest(APIRoutes.getStudentsPath(courseId), successFunc, errorFunc);
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
      console.log(student)
      return(
        <View key={i}>
            <Button
            onPress={() => navigate('StudentProfile', {refreshStudents: this._fetchStudent})}
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
