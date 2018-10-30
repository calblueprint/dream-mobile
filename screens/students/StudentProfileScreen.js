import React from 'react';
import { Image, Button, Text, View, ScrollView, StyleSheet} from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';
import colors from '../../styles/colors';
import { getRequest, deleteRequest, putRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { formViewStyles } from '../../styles/formViewStyles';
import { standardError, confirmDelete } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';
import { connect } from 'react-redux';
import actions from '../../actions';



class StudentProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this._renderStudent = this._renderStudent.bind(this);
    this._handleUpdateStudent = this._handleUpdateStudent.bind(this);
    this._deleteEnrollment = this._deleteEnrollment.bind(this);
  }

  calculatePercentages(attendance_stats) {
    const total = attendance_stats.num_present + attendance_stats.num_late + attendance_stats.num_absent;
    // var present = (attendance_stats.num_present / total) * 100;
    // var late = (attendance_stats.num_late / total) * 100;
    // var absent = (attendance_stats.num_absent / total) * 100;
    var present = `${attendance_stats.num_present} / ${total}`
    var late = `${attendance_stats.num_late} / ${total}`
    var absent = `${attendance_stats.num_absent} / ${total}`
    // return {present: present.toFixed(1), late: late.toFixed(1), absent: absent.toFixed(1)};
    return {present: present, late: late, absent: absent};
  }

  _deleteEnrollment() {
    var params = {
        student__c: this.props.student.id,
        class__c: this.props.courseId
    }
    const successFunc = (responseData) => {
      this.props.unenrollStudent(this.props.student.id, this.props.courseId);
      this.props.navigation.goBack();
    }
    //TODO: What happens if this function fails. Are we still offline first? HAndle this!!!
    deleteRequest(APIRoutes.getCoursesStudentsPath(), successFunc, standardError, params=params);
  }

  _handleUpdateStudent(params) {
    const successFunc = (responseData) => {
      this.props.navigation.state.params.refreshStudent();
      this.props.navigation.navigate('Courses');
    }
    putRequest(APIRoutes.getStudentPath(this.props.student.id), successFunc, standardError, params=params);
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

  _renderStudent() {
    const { navigate } = this.props.navigation;
    if (!this.props.student ) {
      return;
    }
    attendance_stats = this._renderAttendanceStats()
    personal_info = this._renderPersonalInfo()
    contact_info = this._renderContactInfo()
    extra_info = this._renderExtraInfo()
    return(
        <View style={{backgroundColor: colors.primaryYellow, marginTop: -200}}>
          <View style={{backgroundColor: colors.primaryYellow, marginTop: 200, paddingBottom: 24}}>
            <View style={formViewStyles.div_1}>
              <View style={formViewStyles.div_2}>
                <Text style={textStyles.titleLargeLight}>
                {this.props.student.first_name__c} {this.props.student.last_name__c}
                </Text>
                <View style={formViewStyles.div_2}>
                  <Text style={textStyles.bodySmallLight}>{this.props.student.nickname}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{backgroundColor: colors.backgroundWhite}}>
            { attendance_stats }
            { personal_info }
            { contact_info }
            { extra_info }

            <View style={{marginTop: 40, marginBottom: 40}}>
              <StyledButton
                onPress={() => confirmDelete("Are you sure you want to remove this student from the course?", this._deleteEnrollment)}
                text='Unenroll Student'
                secondaryButtonLarge
              />
            </View>
          </View>
      </View>
    );
  }
  _renderAttendanceStats() {
    if(!this.props.student || !this.props.student.attendance_stats) {
      return;
    }
    const attendanceStats = this.calculatePercentages(this.props.student.attendance_stats)
    return (
      <View style={{flex: 1, flexDirection: 'row', marginTop: 16}}>
        <View style={{flex: 0.08}}/>
        <View style={{flex: 0.25, backgroundColor: '#E1FCEE', padding: 12, borderRadius: 4}}>
          <Text style={[textStyles.bodyBold, {textAlign: 'center'}]}>{attendanceStats.present}</Text>
          <Text style={[textStyles.bodySmallBold, {marginTop: 4, textAlign: 'center', color: colors.successGreen}]}>Present</Text>
        </View>
        <View style={{flex: 0.045}}/>
        <View style={{flex: 0.25, backgroundColor: '#FCEBEB', padding: 12, borderRadius: 4}}>
          <Text style={[textStyles.bodyBold, {textAlign: 'center'}]}>{attendanceStats.absent}</Text>
          <Text style={[textStyles.bodySmallBold, {marginTop: 4, textAlign: 'center', color: colors.errorRed}]}>Absent</Text>
        </View>
        <View style={{flex: 0.045}}/>
        <View style={{flex: 0.25, backgroundColor: '#FFF3E5', padding: 12, borderRadius: 4}}>
          <Text style={[textStyles.bodyBold, {textAlign: 'center'}]}>{attendanceStats.late}</Text>
          <Text style={[textStyles.bodySmallBold, {marginTop: 4, textAlign: 'center', color: colors.lateOrange}]}>Late</Text>
        </View>
        <View style={{flex: 0.08}}/>
      </View>
    )

  }
  _renderPersonalInfo() {
    return (
      <View style={viewStyles.outer}>
        <View style={formViewStyles.div_2}>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 0.7}}>
                  <Text style={textStyles.titleMedium}>Personal Information </Text>
              </View>
              <View style={{flex: 0.3}}>
                  <StyledButton
                    text='Edit'
                    editButton
                  />
              </View>
          </View> // close row
          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Nickname
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.nickname__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Birthday
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.date_of_birth__c}
            </Text>
          </View>
          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Sex
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.sex__c}
            </Text>
          </View>
        </View> // close div
      </View> // close outer
    )
  }
  _renderExtraInfo() {
    return(
      <View style={viewStyles.outer}>
        <View style={formViewStyles.div_2}>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 0.7}}>
                <Text style={textStyles.titleMedium}>Extra Information </Text>
            </View>
            <View style={{flex: 0.3}}>
                <StyledButton
                  text='Edit'
                  editButton
                />
            </View>
            </View>
          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Notes
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.notes__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Primary Language
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.idioma_principal__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Document Type
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.tipo_de_documento__c}
            </Text>
          </View>
        </View>

      </View>
      )
  }
  _renderContactInfo() {
    return(
      <View style={viewStyles.outer}>
        <View style={formViewStyles.div_2}>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 0.7}}>
                  <Text style={textStyles.titleMedium}>Contact Information </Text>
              </View>
              <View style={{flex: 0.3}}>
                  <StyledButton
                    text='Edit'
                    editButton
                  />
              </View>
          </View> // Closes row
          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Address
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.direccion__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Phone Numbers
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.phone_number_1__c} {"\n"}
            {this.props.student.phone_number_2__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Name on Facebook
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.usuario_de_facebook__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Email Address
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.email__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Primary Contact Name
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.contacto_primario_name__c}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Primary Contact Phone Number
            </Text>
            <Text style={textStyles.body}>
            {this.props.student.contacto_primario_phone__c}
            </Text>
          </View>


        </View> //close div
      </View> // Closes the whole thing

    }


}

const mapStateToProps = (state, props) => {
  // Get course and date associated with this attendance screen
  const course = state.courses.find((course) => course.id === props.navigation.state.params.courseId);
  console.log('state.courses');
  console.log(state.courses);
  console.log('courseID');
  console.log(props.navigation.state.params.courseId);
  console.log('course.students');
  console.log(course.students);
  const student = course.students.find((student) => student.id === props.navigation.state.params.studentId);
  return {
    ...props.navigation.state.params,
    student: student,
  };
}

const viewStyles = StyleSheet.create({
  outer: {
    margin: 24,
    marginBottom: 8
  },
})


const mapDispatchToProps = (dispatch) => {
  return {
    unenrollStudent: (studentId, courseId) => dispatch(actions.unenrollStudent(studentId, courseId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfileScreen);
