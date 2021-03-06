import React from 'react';
import { Image, Button, Text, View, ScrollView } from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { getRequest, deleteRequest, putRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { formViewStyles } from '../../styles/formViewStyles';
import { standardError, confirmDelete } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';

class StudentProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this._renderStudent = this._renderStudent.bind(this);
    this._fetchStudent = this._fetchStudent.bind(this);
    this._handleUpdateStudent = this._handleUpdateStudent.bind(this);
    this._deleteEnrollment = this._deleteEnrollment.bind(this);

    this.state = {
      student : { },
      isLoading : true,
      studentId: this.props.navigation.state.params.studentId,
      courseId: this.props.navigation.state.params.courseId,
      navbarColor: this.props.navigation.state.params.navbarColor
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
        student__c: this.state.studentId,
        class__c: this.state.courseId
    }
    const successFunc = (responseData) => {
      // this.props.navigation.state.params.refreshStudents();
      this.props.navigation.navigate('ViewCourse', {
        course_id: this.state.courseId,
        navbarColor: this.state.navbarColor
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
        <View style={formViewStyles.div_1}>
          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleLarge}>
            {this.state.student.first_name__c} {this.state.student.last_name__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 0.7}}>
                    <Text style={textStyles.titleMedium}> Personal Information </Text>
                </View>
                <View style={{flex: 0.3}}>
                    <StyledButton
                      onPress={() => navigate('StudentPersonalDetails', {
                        refreshStudent: this._fetchStudent(this.state.studentId), 
                        newStudent: false, 
                        student: this.state.student, 
                        navbarColor: this.state.navbarColor})}
                      text='Edit'
                      noPaddingPrimaryButtonSmall
                    />
                </View>
            </View>
          </View>
   

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Nickname
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.nickname__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Birthday
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.date_of_birth__c}
            </Text>
          </View>

          {/*<View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Active Participant?
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.is_active}
            </Text>
          </View>*/}

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Sex
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.sex__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 0.7}}>
                    <Text style={textStyles.titleMedium}> Contact Information </Text>
                </View>
                <View style={{flex: 0.3}}>
                    <StyledButton
                      onPress={() => navigate('StudentContactInfo', {
                        refreshStudent: this._fetchStudent(this.state.studentId), 
                        newStudent: false, 
                        student: this.state.student, 
                        navbarColor: this.state.navbarColor})}
                      text='Edit'
                      noPaddingPrimaryButtonSmall
                    />
                </View>
            </View>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Address
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.direccion__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}> 
            <Text style={textStyles.titleSmall}>
            Phone Numbers
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.phone_number_1__c} {"\n"}
            {this.state.student.phone_number_2__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Name on Facebook
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.usuario_de_facebook__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Email Address
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.email__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Primary Contact Name
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.contacto_primario_name__c}
            </Text>
          </View>
        
          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Primary Contact Phone Number
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.contacto_primario_phone__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 0.7}}>
                  <Text style={textStyles.titleMedium}> Extra Information </Text>
              </View>
              <View style={{flex: 0.3}}>
                  <StyledButton
                    onPress={() => navigate('StudentExtraInfo', {
                      refreshStudent: this._fetchStudent(this.state.studentId), 
                      newStudent: false, 
                      student: this.state.student, 
                      navbarColor: this.state.navbarColor})}
                    text='Edit'
                    noPaddingPrimaryButtonSmall
                  />
              </View>
            </View>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Notes
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.notes__c}
            </Text>
          </View>

          {/*<View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Level (Montessori Only)
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.level}
            </Text>
          </View>*/}

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Primary Language 
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.idioma_principal__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Document Type
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.tipo_de_documento__c}
            </Text>
          </View>

          {/*<View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Participated in DREAM before?
            </Text>
            <Text style={textStyles.body}>
            {this.state.student.past_dream_participant}
            </Text>
          </View>*/}

        <Button
          onPress={() => confirmDelete("Are you sure you want to remove this student from the course?", this._deleteEnrollment)}
          title='Unenroll Student'
        />
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

export default StudentProfileScreen;
