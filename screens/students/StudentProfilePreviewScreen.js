import React from 'react';
import { Image, Button, Text, View, ScrollView } from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { getRequest, deleteRequest, postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { formViewStyles } from '../../styles/formViewStyles';
import { standardError } from '../../lib/alerts';
import {formStyles} from "../../components/Form/styles";
import StyledButton from '../../components/Button/Button';

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
      navbarColor: this.props.navigation.state.params.navbarColor,
      student: { }
    }
  }


  _handleEnrollStudent() {
    const successFunc = (responseData) => {
      this.props.navigation.state.params.refreshStudents();
      this.props.navigation.navigate('ViewCourse', { 
        course_id: this.state.course_id, 
        navbarColor: this.state.navbarColor,
      });
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
      <View style={formStyles.background}>
        <View style={formStyles.container}>
          <Text style={textStyles.titleLarge}>
            {this.state.student.first_name} {this.state.student.last_name} - {this.state.student.dream_id}
          </Text>

          <Text style={[textStyles.titleSmall, {
            marginTop: 24
          }]}>
            Birthday
          </Text>
          <Text style={[textStyles.body, {
            marginTop: 8
          }]}>
            {this.state.student.birthday}
          </Text>

          <Text style={[textStyles.titleSmall, {
            marginTop: 24
          }]}>
            Address
          </Text>
          <Text style={[textStyles.body, {
            marginTop: 8
          }]}>
            {this.state.student.address}
          </Text>

          <Text style={[textStyles.titleSmall, {
            marginTop: 24
          }]}>
            Phone Number
          </Text>
          <Text style={[textStyles.body, {
            marginTop: 8
          }]}>
            {this.state.student.phone}
          </Text>

          <Text style={[textStyles.titleSmall, {
            marginTop: 24
          }]}>
            Alternate Phone Number
          </Text>
          <Text style={[textStyles.body, {
            marginTop: 8
          }]}>
            {this.state.student.phone_2}
          </Text>

          <View style={{marginTop: 32}}>
            <StyledButton
              onPress={() => this._handleEnrollStudent()}
              text='Enroll Student'
              primaryButtonLarge>
            </StyledButton>
          </View>
        </View>
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
