import React from 'react';
import { Image, Button, Text, View, ScrollView } from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { getRequest, deleteRequest, postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { formViewStyles } from '../../styles/formViewStyles';
import { standardError } from '../../lib/alerts';

class StudentProfilePreviewScreen extends React.Component {

  constructor(props) {
    super(props);
    this._renderStudent = this._renderStudent.bind(this);
    this._fetchStudent = this._fetchStudent.bind(this);
    this._handleEnrollStudent = this._handleEnrollStudent.bind(this);

    this.state = {
      isLoading : true,
      studentId: this.props.navigation.state.params.studentId,
      course_id: this.props.navigation.state.params.course_id,
      student: { }
    }
  }


  _handleEnrollStudent() {
    const successFunc = (responseData) => {
      this.props.navigation.state.params.refreshStudents();
      this.props.navigation.navigate('ViewCourse', { course_id: this.state.course_id });
    }

    const p = {
      student_id: this.state.studentId,
      course_id: this.state.course_id
    }

    postRequest(APIRoutes.getCoursesStudentsPath(), successFunc, standardError, params=p);
  }

  componentDidMount() {
    this._fetchStudent(this.state.studentId);
  }

  _fetchStudent(studentId) {
    const { navigate } = this.props.navigation;
    const successFunc = (responseData) => {
      this.setState({ student: responseData, isLoading: false });
    }

    getRequest(APIRoutes.getStudentPath(studentId), successFunc, standardError);
  }

  _renderStudent() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Text style={textStyles.titleLarge}>
          {this.state.student.first_name} {this.state.student.last_name} - {this.state.student.dream_id}
        </Text>

        <Text style={textStyles.titleSmall}>
          Birthday
        </Text>
        <Text style={textStyles.body}>
          {this.state.student.birthday}
        </Text>

        <Text style={textStyles.titleSmall}>
          Address
        </Text>
        <Text style={textStyles.body}>
          {this.state.student.address}
        </Text>

        <Text style={textStyles.titleSmall}>
          Phone Number
        </Text>
        <Text style={textStyles.body}>
          {this.state.student.phone}
        </Text>

        <Text style={textStyles.titleSmall}>
          Alternate Phone Number
        </Text>
        <Text style={textStyles.body}>
          {this.state.student.phone_2}
        </Text>

        <Button
          onPress={() => this._handleEnrollStudent()}
          title='Enroll Student'
        />
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let students;
    if (this.state.isLoading) {
      student = (
        <Image
          style={commonStyles.icon}
          source={require('../../icons/spinner.gif')}
        />
      )
    } else {
      student = this._renderStudent()
    }
    return (
      <ScrollView style={formViewStyles.base}>
        { student }
      </ScrollView>
    );
  }
}

export default StudentProfilePreviewScreen;
