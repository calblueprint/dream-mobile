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
import { connect } from 'react-redux';


class StudentProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this._renderStudent = this._renderStudent.bind(this);
    this._handleUpdateStudent = this._handleUpdateStudent.bind(this);
    this._deleteEnrollment = this._deleteEnrollment.bind(this);
  }

  calculatePercentages(attendance_stats) {
    const total = attendance_stats.num_present + attendance_stats.num_late + attendance_stats.num_absent;
    var present = (attendance_stats.num_present / total) * 100;
    var late = (attendance_stats.num_late / total) * 100;
    var absent = (attendance_stats.num_absent / total) * 100;
    return {present: present.toFixed(1), late: late.toFixed(1), absent: absent.toFixed(1)};
  }

  _deleteEnrollment() {
    var params = {
        student_id: this.props.student.id,
        course_id: this.props.courseId
    }
    const successFunc = (responseData) => {
      // this.props.navigation.state.params.refreshStudents();
      this.props.navigation.navigate('ViewCourse', {
        course_id: this.props.courseId,
        navbarColor: this.props.navbarColor
      });
    }
    deleteRequest(APIRoutes.getCoursesStudentsPath(), successFunc, standardError, params=params);
  }

  _handleUpdateStudent(params) {
    const successFunc = (responseData) => {
      // this.props.navigation.state.params.refreshStudent();
      this.props.navigation.navigate('Courses');
    }
    putRequest(APIRoutes.getStudentPath(this.props.student.id), successFunc, standardError, params=params);
  }

  _renderStudent() {
    const { navigate } = this.props.navigation;
    const attendanceStats = this.calculatePercentages(this.props.student.attendance_stats)
    return(
      <View>
        <View style={formViewStyles.div_1}>
          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleLarge}>
            {this.props.student.first_name} {this.props.student.last_name} - {this.props.student.dream_id}
            </Text>
          </View>
          <Text style={{fontWeight: 'bold'}}> Attendance Stats </Text>
          <Text style={textStyles.body}>
          Percent Present: {attendanceStats.present}%
          </Text>
          <Text style={textStyles.body}>
          Percent Absent: {attendanceStats.absent}%
          </Text>
          <Text style={textStyles.body}>
          Percent Late: {attendanceStats.late}%
          </Text>

          <View style={formViewStyles.div_2}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 0.7}}>
                    <Text style={textStyles.titleMedium}> Personal Information </Text>
                </View>
                <View style={{flex: 0.3}}>
                    <StyledButton
                      onPress={() => navigate('StudentPersonalDetails', {
                        newStudent: false,
                        student: this.props.student,
                        navbarColor: this.props.navbarColor
                      })}
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
            {this.props.student.nickname}
            </Text>
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

          <View style={formViewStyles.div_2}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 0.7}}>
                    <Text style={textStyles.titleMedium}> Contact Information </Text>
                </View>
                <View style={{flex: 0.3}}>
                    <StyledButton
                      onPress={() => navigate('StudentContactInfo', {
                        newStudent: false,
                        student: this.props.student,
                        navbarColor: this.props.navbarColor})}
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

          <View style={formViewStyles.div_2}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 0.7}}>
                  <Text style={textStyles.titleMedium}> Extra Information </Text>
              </View>
              <View style={{flex: 0.3}}>
                  <StyledButton
                    onPress={() => navigate('StudentExtraInfo', {
                      newStudent: false,
                      student: this.props.student,
                      navbarColor: this.props.navbarColor})}
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     syncAttendances: (attendances, curAttendances, courseId, date, openModal) => dispatch(syncAttendances(attendances, curAttendances, courseId, date, openModal)),
//   }
// }

export default connect(mapStateToProps, null)(StudentProfileScreen);
