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
        student_id: this.props.student.id,
        course_id: this.props.courseId
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
                    onPress={() => this.props.navigation.navigate('StudentPersonalDetails', {
                      newStudent: false,
                      student: this.props.student,
                      navbarColor: this.props.navbarColor
                    })}
                    text='Edit'
                    editButton
                  />
              </View>
          </View>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Birthday
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.birthday}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Active Participant?
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.is_active}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Sex
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.sex}
          </Text>
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
                    onPress={() => this.props.navigation.navigate('StudentContactInfo', {
                      newStudent: false,
                      student: this.props.student,
                      navbarColor: this.props.navbarColor})}
                    text='Edit'
                    editButton
                  />
              </View>
          </View>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Address
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.address}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Phone Numbers
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.phone} {"\n"}
          {this.props.student.phone_2}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Name on Facebook
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.facebook_name}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Email Address
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.email}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Primary Contact Name
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.primary_contact}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Primary Contact Phone Number
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.primary_contact_phone}
          </Text>
        </View>
      </View>
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
                  onPress={() => this.props.navigation.navigate('StudentExtraInfo', {
                    newStudent: false,
                    student: this.props.student,
                    navbarColor: this.props.navbarColor})}
                  text='Edit'
                  editButton
                />
            </View>
          </View>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Notes
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.notes}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Level (Montessori Only)
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.level}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Primary Language
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.primary_language}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Document Type
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.document_type}
          </Text>
        </View>

        <View style={formViewStyles.div_2}>
          <Text style={textStyles.titleSmall}>
          Participated in DREAM before?
          </Text>
          <Text style={textStyles.body}>
          {this.props.student.past_dream_participant}
          </Text>
        </View>
      </View>
      )
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
                {this.props.student.first_name} {this.props.student.last_name}
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

const mapStateToProps = (state, props) => {
  // Get course and date associated with this attendance screen
  const course = state.courses.find((course) => course.id === props.navigation.state.params.courseId);
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
