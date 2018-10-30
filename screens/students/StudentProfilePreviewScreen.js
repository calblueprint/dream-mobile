import React from 'react';
import { Image, Button, Text, View, ScrollView, StyleSheet} from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { getRequest, deleteRequest, postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { formViewStyles } from '../../styles/formViewStyles';
import { frontendError, alert } from '../../lib/alerts';
import {formStyles} from "../../components/Form/styles";
import StyledButton from '../../components/Button/Button';
import { connect } from 'react-redux';
import actions from '../../actions';



class StudentProfilePreviewScreen extends React.Component {

  constructor(props) {
    super(props);
    this._renderStudent = this._renderStudent.bind(this);
    this._handleEnrollStudent = this._handleEnrollStudent.bind(this);

    //THis state updating is 100% for convenience tbh. bad practice
    this.state = {
      student: this.props.navigation.state.params.student,
      course_id: this.props.navigation.state.params.course_id,
      navbarColor: this.props.navigation.state.params.navbarColor,
      parentKey: this.props.navigation.state.params.parentKey,
    }
  }


  _handleEnrollStudent() {
    if(this.props.studentIds.includes(this.state.student.id)) {
      console.log("Student is already enrolled");
      frontendError("This student is already enrolled.");
      this.props.navigation.goBack(this.state.parentKey)
      return;
    }
    const successFunc = (responseData) => {
      alert("Success!", "Student Successfully Enrolled")
      this.props.navigation.goBack(this.state.parentKey)
    }

    const p = {
      student__c: this.state.student.id,
      class__c: this.state.course_id
    }
    this.props.enrollStudent(this.state.student, this.state.course_id)
    //TODO: What if this post request fails? Add graceful failing!
    postRequest(APIRoutes.getCoursesStudentsPath(), successFunc, () => frontendError("Student Enrollment Failed"), params=p);
  }

  _renderStudent() {
    const { navigate } = this.props.navigation;
    return(
      <View style={formStyles.background}>
        <View style={viewStyles.outer}>
          <Text style={textStyles.titleLarge}>
            {this.state.student.first_name__c} {this.state.student.last_name__c}
          </Text>

          <Text style={[textStyles.titleSmall, {
            marginTop: 24
          }]}>
            Birthday
          </Text>
          <Text style={[textStyles.body, {
            marginTop: 8
          }]}>
            {this.state.student.date_of_birth__c}
          </Text>

          <Text style={[textStyles.titleSmall, {
            marginTop: 24
          }]}>
            Address
          </Text>
          <Text style={[textStyles.body, {
            marginTop: 8
          }]}>
            {this.state.student.direccion__c}
          </Text>

          <Text style={[textStyles.titleSmall, {
            marginTop: 24
          }]}>
            Phone Number
          </Text>
          <Text style={[textStyles.body, {
            marginTop: 8
          }]}>
            {this.state.student.phone_number_1__c}
          </Text>

          <Text style={[textStyles.titleSmall, {
            marginTop: 24
          }]}>
            Alternate Phone Number
          </Text>
          <Text style={[textStyles.body, {
            marginTop: 8
          }]}>
            {this.state.student.phone_number_2__c}
          </Text>
        </View>
        <StyledButton
          onPress={() => this._handleEnrollStudent()}
          text='Enroll Student'
          primaryButtonLarge>
        </StyledButton>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    student = this._renderStudent()
    return (
      <ScrollView style={formViewStyles.base}>
        { student }
      </ScrollView>
    );
  }
}

const viewStyles = StyleSheet.create({
  outer: {
    margin: 24,
    marginTop: 40,
  },
});

const mapStateToProps = (state, props) => {
  // Get course and date associated with this attendance screen
  const course = state.courses.find((course) => course.id === props.navigation.state.params.course_id);
  return {
    ...props.navigation.state.params,
    studentIds: course.students.map((student) => {return student.id}),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    enrollStudent: (student, courseId) => dispatch(actions.enrollStudent(student, courseId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfilePreviewScreen);
