import React from 'react';
import { Image, Button, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { timeFormat } from '../../lib/datetime_formats';
import { standardError, confirmDelete } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';
import StudentCard from '../../components/StudentCard/StudentCard';
import { formViewStyles } from '../../styles/formViewStyles';
import { textStyles } from '../../styles/textStyles';
import { FontAwesome,Entypo } from '@expo/vector-icons';
import colors from '../../styles/colors';

class ViewCourseScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        headerStyle: {
          backgroundColor: params.navbarColor
        }
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
    }
  }

  componentDidMount() {
    this._fetchCourse();

    const _enrollStudent = () => {
       this.props.navigation.navigate('CreateStudent',
        { refreshStudents: this._fetchStudents, course_id: this.state.course_id, newStudent: true })
     }

    this.props.navigation.setParams({ navbarColor: this.props.navigation.state.params.navbarColor });
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
    const start_date = new Date(this.state.course.start_date)
    const end_date = new Date(this.state.course.end_date)
    const course_start = start_date.toLocaleDateString()
    const course_end = end_date.toLocaleDateString()
    return (
      <View style={{marginTop: 8}}>
        <Text style={textStyles.body}>{ course_start } to { course_end } </Text>
      </View>
    );
  }

  /*
   * Display course teachers.
   */
  _renderTeachers() {
    return this.state.teachers.map((teacher, index) => {
      return (
        <View  key={index} style={{marginTop: 8}}>
          <Text style={textStyles.body}>{teacher.first_name} {teacher.last_name}</Text>
        </View>
      );
    });
  }

  /*
   * Display course sessions.
   */
  _renderSessions() {
    return this.state.sessions.map((session, index) => {
      const start = timeFormat(new Date(session.start_time))
      const end = timeFormat(new Date(session.end_time))
      return (
        <View key={index} style={{marginTop: 8}}>
          <Text style={textStyles.body}> { `${ session.weekday }, ${ start } - ${ end }` } </Text>
        </View>
      );
    });
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
        <ScrollView style={formViewStyles.base}>
          <View style={formViewStyles.div_1}>
            <View style={formViewStyles.div_2}>
              <Text style={textStyles.titleLarge}>{ this.state.course.title }</Text>

              <View style={formViewStyles.div_2}>
                <Text style={textStyles.titleSmall}>Sessions</Text>
                <View style={{marginLeft: -4}}>
                  { this._renderSessions() }
                </View>
              </View>

              <View style={formViewStyles.div_2}>
                <Text style={textStyles.titleSmall}>Teachers</Text>
                { this._renderTeachers() }
              </View>

              <View style={formViewStyles.div_2}>
                <Text style={textStyles.titleSmall}>In Session</Text>
                { this._renderCourseDate() }
              </View>
            </View>
          </View>

          <View style={{marginTop: 16}}/>
          <StyledButton
            onPress={() => navigate('EditCourse',
              {
                refreshCourses: this._fetchCourse,
                newCourse: false,
                course_id: this.state.course_id,
                is_active: this.state.course.is_active,
                title: this.state.course.title,
                teacher1: this.state.course.teacher_id1,
                teacher2: this.state.course.teacher_id2,
                start_date: this.state.course.start_date,
                end_date: this.state.course.end_date,
                sessions: this.state.sessions,
              })}
            text="Edit Course"
            linkButton
          />

          <View>{ this._renderDeleteCourseButton() }</View>

          <StyledButton
            text="View Past Attendance"
            primaryButtonLarge
          />
          <View style={[commonStyles.divider, {marginTop: 16}]}/>


          <View style={[formViewStyles.div_1, {marginBottom: 16}]}>
              <Text style={textStyles.titleMedium}>Students</Text>
              <View style={{marginTop: 8}}>
              { this._renderStudents() }
            </View>
          </View>

          <StyledButton
            onPress={() => this.props.navigation.navigate('SearchStudent',
            { refreshStudents: this._fetchStudents,
              course_id: this.state.course_id, })}
            text="+ Enroll Student"
            linkButton
          />
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
