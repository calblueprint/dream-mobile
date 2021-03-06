import React from 'react';
import { Image, Button, ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { timeFormat } from '../../lib/datetime_formats';
import { standardError, confirmDelete } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';
import StudentCard from '../../components/StudentCard/StudentCard';
import { formViewStyles } from '../../styles/formViewStyles';
import { textStyles } from '../../styles/textStyles';
import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../styles/colors';
import { attendanceDate } from '../../lib/date';


//TODO: (Aivant) Convert this to offline!
class ViewCourseScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        headerStyle: {
          backgroundColor: params.navbarColor,
          borderBottomColor: 'transparent',
        }, 
        headerTintColor: '#fff', 
        headerRight: (
          <TouchableOpacity onPress={() => params.handleEditCourse()}>
            <View style={{marginRight: 8}}><MaterialCommunityIcons name="pencil" size={30} color={'#fff'} /></View>
          </TouchableOpacity>
        )
    };
  };

  constructor(props) {
    super(props);
    this._fetchCourse = this._fetchCourse.bind(this);
    this._fetchSessions = this._fetchSessions.bind(this);
    this._fetchStudents = this._fetchStudents.bind(this);
    this._fetchTeachers = this._fetchTeachers.bind(this);
    this._handleSelectStudent = this._handleSelectStudent.bind(this);
    this._deleteCourse = this._deleteCourse.bind(this);
    this._renderDeleteCourseButton = this._renderDeleteCourseButton.bind(this);
    this._renderCourseDate = this._renderCourseDate.bind(this);
    this._renderSessions = this._renderSessions.bind(this);
    this._renderTeachers = this._renderTeachers.bind(this);
    this.state = {
      course_id : this.props.navigation.state.params.course_id,
      sessions: [],
      course : { },
      isLoading : true,
      students: [],
      navbarColor: this.props.navigation.state.params.navbarColor
    }
  }

  componentDidMount() {
    this._fetchCourse();

    // const _enrollStudent = () => {
    //    this.props.navigation.navigate('StudentPersonalDetails',
    //     { refreshStudents: this._fetchStudents, 
    //       course_id: this.state.course_id, 
    //       navbarColor: this.state.navbarColor, 
    //       newStudent: true })
    //  }

     const _editCourse = () => {
        this.props.navigation.navigate('EditCourse', {
          refreshCourses: this._fetchCourse,
          newCourse: false,
          course_id: this.state.course_id,
          navbarColor: this.state.navbarColor,
          is_active: this.state.course.is_active,
          title__c: this.state.course.title__c,
          facilitator_1__c: this.state.course.f1_email__c,
          facilitator_2__c: this.state.course.f2_email__c,
          start_date__c: this.state.course.start_date__c,
          end_date__c: this.state.course.end_date__c,
          sessions: this.state.sessions,
        })}

    this.props.navigation.setParams({ navbarColor: this.state.navbarColor, 
      handleEditCourse: _editCourse });
  }

  /*
   * Fetch record for single course.
   */
  _fetchCourse() {
    const successFunc = (responseData) => {
      this.setState({ course: responseData });
      this._fetchSessions();
    }
    getRequest(APIRoutes.getCoursePath(this.state.course_id), successFunc, standardError);
  }

  /*
   * Fetch record for single course.
   */
  _fetchSessions() {
    const successFunc = (responseData) => {
      this.setState({ sessions: responseData.sessions });
      this._fetchTeachers();
    }
    getRequest(APIRoutes.getSessionsPath(this.state.course_id), successFunc, standardError);
  }

  /*
   * Fetch record for the course.
   */
  _fetchTeachers() {
    const successFunc = (responseData) => {
      this.setState({ teachers: responseData.teachers});
      this._fetchStudents();
    }
    getRequest(APIRoutes.getTeachersPath(this.state.course_id), successFunc, standardError);
  }

  /*
   * Fetch students for the course.
   */
  _fetchStudents() {
    const successFunc = (responseData) => {
      this.setState({ students: responseData, isLoading: false });
    }
    
    getRequest(APIRoutes.getStudentsInCoursePath(this.state.course_id), successFunc, standardError);
  }

  _handleSelectStudent(id) {
    this.props.navigation.navigate('StudentProfile', {
      refreshStudents: this._fetchStudents(),
      studentId: id,
      courseId: this.state.course_id,
      navbarColor: this.state.navbarColor,
    });
  }

  /*
   * Make a delete request. On success, re-render the component.
   */
  _deleteCourse() {
    const successFunc = (responseData) => {
      this.props.navigation.navigate('Courses');
    }

    deleteRequest(APIRoutes.getCoursePath(this.state.course_id), successFunc, standardError);
  }

  _renderDeleteCourseButton() {
    return (
      <StyledButton
        onPress={() => confirmDelete("Are you sure you want to delete this course?", this._deleteCourse)}
        text='Delete Course'
        linkButton>
      </StyledButton>
    );
  }

  /*
   * Display course dates.
   */
  _renderCourseDate() {
    const start_date__c = new Date(this.state.course.start_date__c)
    const end_date__c = new Date(this.state.course.end_date__c)
    const course_start = start_date__c.toLocaleDateString()
    const course_end = end_date__c.toLocaleDateString()
    return (
      <Text style={textStyles.bodySmallLight}>{`${course_start} to ${course_end}`}</Text>
    );
  }

  /*
   * Display course teachers.
   */
  _renderTeachers() {
    if (this.state.course.f2_first_name__c == undefined) {
      return (
        `${this.state.course.f1_first_name__c} ${this.state.course.f1_last_name__c}`
      );
    } else {
      return (
        `${this.state.course.f1_first_name__c} ${this.state.course.f1_last_name__c}, ${this.state.course.f2_first_name__c} ${this.state.course.f2_last_name__c}`
      );
    }
  }

  /*
   * Display course sessions.
   */
  _renderSessions() {
    if (this.state.sessions.length != 0) {
      return this.state.sessions.map((session, index) => {
        const start = timeFormat(new Date(session.start_time))
        const end = timeFormat(new Date(session.end_time))
        return (
          <View key={index}>
            <Text style={textStyles.bodySmallLight}>{`${session.weekday}, ${ start } - ${ end }` } </Text>
          </View>
        );
      });
    } else {
        const { params = {} } = this.props.navigation.state;
        return (
          <TouchableOpacity onPress={() => params.handleEditCourse()}>
            <View>
              <Text style={textStyles.buttonTextAddSessionCourse} >+ Add Session</Text>
            </View>
          </TouchableOpacity>
        );
    }
  }

  /*
   * Display course students
   */
  _renderStudents() {
    const { navigate } = this.props.navigation;
    return this.state.students.map((student, i) =>  (
      <StudentCard key={i}
        student={student}
        onSelectStudent={this._handleSelectStudent}
      />
      )
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={commonStyles.containerStatic}>
          <Image
            style={commonStyles.icon}
            source={require('../../icons/spinner.gif')}
          />
      </View>
      );
    } else {
      return (
        <ScrollView style={{backgroundColor: this.state.navbarColor, borderBottomWidth: 400, borderBottomColor: '#fff'}}>
          <View style={{backgroundColor: this.state.navbarColor, paddingBottom: 24}}>
            <View style={formViewStyles.div_1}>
              <View style={formViewStyles.div_2}>
                <Text style={[textStyles.titleLargeLight, {marginBottom: 16}]}>{ this.state.course.title__c }</Text>

                <View style={formViewStyles.div_2}>
                  { this._renderSessions() }
                </View>

                <View style={formViewStyles.div_2}>
                  <Text style={textStyles.bodySmallLight}>{ this._renderTeachers() }</Text>
                </View>

                <View style={formViewStyles.div_2}>
                  { this._renderCourseDate() }
                </View>
              </View>
            </View>
          </View>

          <View style={{backgroundColor: colors.backgroundWhite}}>

            <View style={{marginTop: 16}}>
              <StyledButton
                onPress={() => navigate('Attendances', {
                  courseId: this.state.course.id,
                  courseTitle: this.state.course.title__c,
                  date: attendanceDate(new Date()),
                })}
                text="Take Attendance"
                // secondaryButtonLarge
                variableButton={ this.state.navbarColor }
              />
              <StyledButton
                onPress={() => navigate('RecentAttendances',
                  { courseId: this.state.course.id,
                    courseTitle: this.state.course.title__c})}
                text="View Past Attendance"
                secondaryButtonLarge
              />
            </View> 

            <View style={[commonStyles.divider, {marginTop: 16, marginBottom: 16}]}/>


            <View style={[formViewStyles.div_1, {marginBottom: 16}]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 0.6}}>
                  <Text style={textStyles.titleMedium}>Students</Text>
                </View>
                <View style={{flex: 0.4, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <StyledButton
                    onPress={() => this.props.navigation.navigate('SearchStudent',
                    { refreshStudents: this._fetchStudents,
                      course_id: this.state.course_id,
                      navbarColor: this.state.navbarColor,
                       })}
                    text="+ Enroll Student"
                    enrollSmall
                  />
                </View>
              </View>
              <View style={{marginTop: 8, marginBottom: 40}}>
                { this._renderStudents() }
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const viewStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 16,
    paddingLeft: 16,
  },
});

export default ViewCourseScreen;
