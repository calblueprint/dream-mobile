import React from 'react';
import { Image, Button, Text, View, ScrollView } from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { getRequest, deleteRequest, putRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { formViewStyles } from '../../styles/formViewStyles';
import { standardError, confirmDelete } from '../../lib/alerts';

class StudentProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this._renderStudent = this._renderStudent.bind(this);
    this._fetchStudent = this._fetchStudent.bind(this);
    this._deleteStudent = this._deleteStudent.bind(this);
    this._handleUpdateStudent = this._handleUpdateStudent.bind(this);
    this._deleteEnrollment = this._deleteEnrollment.bind(this);

    this.state = {
      student : { },
      isLoading : true,
      studentId: this.props.navigation.state.params.studentId,
      courseId: this.props.navigation.state.params.courseId,
    }
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

  _deleteEnrollment() {
    var params = {
        student_id: this.state.studentId,
        course_id: this.state.courseId
    }
    const successFunc = (responseData) => {
      // this.props.navigation.state.params.refreshStudents();
      this.props.navigation.navigate('ViewCourse', {
        course_id: this.state.courseId
      });
    }
    deleteRequest(APIRoutes.getCoursesStudentsPath(), successFunc, standardError, params=params);
  }

  _handleUpdateStudent(params) {
    const successFunc = (responseData) => {
      // this.props.navigation.state.params.refreshStudent();
      this.props.navigation.navigate('Courses');
    }
    putRequest(APIRoutes.getStudentPath(this.state.studentId), successFunc, standardError, params=params);
  }

  _renderStudent() {
    const { navigate } = this.props.navigation;
    return(
       <View>
        <View style={{marginTop: 10, marginBottom: 20}}>
            <Text style={textStyles.titleLarge}>
            {this.state.student.first_name} {this.state.student.last_name} - {this.state.student.dream_id}
            </Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
                <Text style={textStyles.titleMedium}> Personal Information </Text>
            </View>
            <View style={{flex: 0.3}}>
                <Button
                  onPress={() => navigate('StudentPersonalDetails', {refreshStudent: this._fetchStudent(this.state.studentId), 
                    newStudent: false, student: this.state.student})}
                  title='Edit'
                />
            </View>
        </View>

        <Text style={textStyles.titleSmall}>
        Nickname
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.nickname}
        </Text>

        <Text style={textStyles.titleSmall}>
        Birthday
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.birthday}
        </Text>

        <Text style={textStyles.titleSmall}>
        Sex
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.sex}
        </Text>


        <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
            <View style={{flex: 0.7}}>
                <Text style={textStyles.titleMedium}> Contact Information </Text>
            </View>
            <View style={{flex: 0.3}}>
                <Button
                  onPress={() => navigate('StudentContactInfo', {refreshStudent: this._fetchStudent(this.state.studentId), 
                    newStudent: false, student: this.state.student})}
                  title='Edit'
                />
            </View>
        </View>

        <Text style={textStyles.titleSmall}>
        Address
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.address}
        </Text>

        <Text style={textStyles.titleSmall}>
        Phone Numbers
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.phone} {"\n"}
        {this.state.student.phone_2}
        </Text>

        <Text style={textStyles.titleSmall}>
        Name on Facebook
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.facebook_name}
        </Text>

        <Text style={textStyles.titleSmall}>
        Email Address
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.email}
        </Text>

        <Text style={textStyles.titleSmall}>
        Primary Contact Name
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.primary_contact}
        </Text>

        <Text style={textStyles.titleSmall}>
        Primary Contact Phone Number
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.primary_contact_phone}
        </Text>

        <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
            <View style={{flex: 0.7}}>
                <Text style={textStyles.titleMedium}> Extra Information </Text>
            </View>
            <View style={{flex: 0.3}}>
                <Button
                  onPress={() => navigate('StudentExtraInfo', {refreshStudent: this._fetchStudent(this.state.studentId), 
                    newStudent: false, student: this.state.student})}
                  title='Edit'
                />
            </View>
        </View>

        <Text style={textStyles.titleSmall}>
        Notes
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.notes}
        </Text>

        <Text style={textStyles.titleSmall}>
        Level (Montessori Only)
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.level}
        </Text>

        <Text style={textStyles.titleSmall}>
        Primary Language 
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.primary_language}
        </Text>

        <Text style={textStyles.titleSmall}>
        Document Type
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.document_type}
        </Text>

        <Text style={textStyles.titleSmall}>
        Participated in DREAM before?
        </Text>
        <Text style={textStyles.body}>
        {this.state.student.past_dream_participant}
        </Text>

        <Button
<<<<<<< HEAD
          onPress={() => this._deleteStudent(this.state.studentId)}
=======
          onPress={() => navigate('CreateStudent', {refreshStudent: this._fetchStudent(this.state.studentId), newStudent: false, student: this.state.student})}
          title='Edit'
        />

        <Button
          onPress={() => confirmDelete("Are you sure you want to remove this student from the course?", this._deleteEnrollment)}
>>>>>>> c81f0040de7acba88a392274435b5b56adfd26ab
          title='Delete'
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

export default StudentProfileScreen;
