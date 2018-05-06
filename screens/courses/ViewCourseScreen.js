import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Image, Button, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { timeFormat } from '../../lib/datetime_formats';
import { standardError, confirmDelete } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';
import StudentCard from '../../components/StudentCard/StudentCard';
import SimpleModal from '../../components/SimpleModal';
import { formViewStyles } from '../../styles/formViewStyles';
import { textStyles } from '../../styles/textStyles';
import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../styles/colors';
import { attendanceDate } from '../../lib/date';
import I18n from '../../lib/i18n/i18n';


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
    this._handleSelectStudent = this._handleSelectStudent.bind(this);
    this._deleteCourse = this._deleteCourse.bind(this);
    this._renderDeleteCourseButton = this._renderDeleteCourseButton.bind(this);
    this._renderCourseDate = this._renderCourseDate.bind(this);
    this._renderSessions = this._renderSessions.bind(this);
    this._renderTeachers = this._renderTeachers.bind(this);
    this._fetchStudents = this._fetchStudents.bind(this);
    this.state = {
      showModal: false,
      navbarColor: this.props.navigation.state.params.navbarColor
    }
  }

  componentDidMount() {
    const _enrollStudent = () => {
       this.props.navigation.navigate('CreateStudent',
        {course_id: this.props.course.id, newStudent: true })
     }

     const _editCourse = () => {
       if(this.props.online) {
          this.props.navigation.navigate('EditCourse', {
            refreshCourses: this._fetchCourse,
            newCourse: false,
            course_id: this.props.course.id,
            is_active: this.props.course.is_active,
            title: this.props.course.title,
            teacher1: this.props.course.teacher_id1,
            teacher2: this.props.course.teacher_id2,
            start_date: this.props.course.start_date,
            end_date: this.props.course.end_date,
            sessions: this.props.course.sessions,
          })
      } else {
        this.setState({showModal: true})
      }
    }

    this.props.navigation.setParams({ navbarColor: this.state.navbarColor, handleEditCourse: _editCourse });
  }

  _fetchStudents() {
    const successFunc = (responseData) => {
      this.setState({ students: responseData, isLoading: false });
    }
    getRequest(APIRoutes.getStudentsInCoursePath(this.props.course.id), successFunc, standardError);
  }

  _handleSelectStudent(id) {
    this.props.navigation.navigate('StudentProfile', {
      studentId: id,
      courseId: this.props.course.id,
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
    deleteRequest(APIRoutes.getCoursePath(this.props.course.id), successFunc, standardError);
  }

  _renderDeleteCourseButton() {
    return (
      <StyledButton
        onPress={() => {
            if (this.props.online) {
              confirmDelete("Are you sure you want to delete this course?", this._deleteCourse)
            } else {
              this.setState({showModal: true})
            }
          }
        }
        text='Delete Course'
        linkButton>
      </StyledButton>
    );
  }

  /**
    * Renders basic offline modal
    */

  //TODO: rendering modal is kind of dumb....it shouldn't be like this.
  _renderModal() {
    const callback = () => {
      this.setState({showModal: false})
    }
    const buttons = [{ title: 'Okay', callback: callback, type: 'primary' }];

    return (
      <SimpleModal
        onClosed={callback}
        title='Unavailable Offline'
        buttons={buttons}
        visible={this.state.showModal}>
        <View style={viewStyles.modalContent}>
          <Text style={textStyles.bodyBold}>This feature is unavailable while offline. Try again later!</Text>
        </View>
      </SimpleModal>
    )
  }

  /*
   * Display course dates.
   */
  _renderCourseDate() {
    const start_date = new Date(this.props.course.start_date)
    const end_date = new Date(this.props.course.end_date)
    const course_start = start_date.toLocaleDateString()
    const course_end = end_date.toLocaleDateString()
    return (
      <Text style={textStyles.bodySmallLight}>{`${course_start} to ${course_end}`}</Text>
    );
  }

  /*
   * Display course teachers.
   */
  _renderTeachers() {
    return this.props.course.teachers.map((teacher, index) => {
      return (
        `${teacher.first_name} ${teacher.last_name}, `
      );
    });
  }

  /*
   * Display course sessions.
   */
  _renderSessions() {
    if(this.props.course.sessions.length == 0) {
      return;
    }
    return this.props.course.sessions.map((session, index) => {
      const start = timeFormat(new Date(session.start_time))
      const end = timeFormat(new Date(session.end_time))
      const i18nWeekday = I18n.t(session.weekday.toLowerCase(), {locale: this.props.locale});
      return (
        <View key={index}>
          <View style={formViewStyles.div_2}>
            <Text style={textStyles.bodySmallLight}>{`${i18nWeekday}, ${ start } - ${ end }` } </Text>
          </View>
        </View>
      );
    });
  }

  /*
   * Display course students
   */
  _renderStudents() {
    const { navigate } = this.props.navigation;
    if (this.props.course.students.length == 0) {
      return (
        <Text style={textStyles.bodySmall}>No students yet. Enroll a student!</Text>
        )
    }

    return this.props.course.students.map((student, i) =>  (
      <StudentCard key={i}
        student={student}
        onSelectStudent={this._handleSelectStudent}
      />
      )
    );
  }

  render() {
    const { navigate } = this.props.navigation;
      return (
        <View>
        <ScrollView style={{backgroundColor: this.state.navbarColor, borderBottomWidth: 400, borderBottomColor: '#fff'}}>
          <View style={{backgroundColor: this.state.navbarColor, paddingBottom: 24}}>
            <View style={formViewStyles.div_1}>
              <View style={formViewStyles.div_2}>
                <Text style={[textStyles.titleLargeLight, {marginBottom: 16}]}>{ this.props.course.title }</Text>

                { this._renderSessions() }

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
                  courseId: this.props.course.id,
                  date: attendanceDate(new Date()),
                })}
                text={I18n.t('takeattendance', {locale: this.props.locale})}
                // secondaryButtonLarge
                variableButton={ this.state.navbarColor }
              />
              <StyledButton
                onPress={() => navigate('RecentAttendances',
                  { courseId: this.props.course.id})}
                text={I18n.t('viewpastattendances', {locale: this.props.locale})}
                secondaryButtonLarge
              />
            </View>
            <View style={[commonStyles.divider, {marginTop: 16, marginBottom: 16}]}/>


            <View style={[formViewStyles.div_1, {marginBottom: 16}]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 0.6}}>
                  <Text style={textStyles.titleMedium}>{I18n.t('students', {locale: this.props.locale})}</Text>
                </View>
                <View style={{flex: 0.4, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <StyledButton
                    onPress={() => {
                        if(this.props.online) {
                          navigate('SearchStudent',
                                  { refreshStudents: this._fetchStudents,
                                    course_id: this.props.course.id,
                                    navbarColor: this.state.navbarColor, });
                        } else {
                          this.setState({showModal: true})
                        }
                      }
                    }
                    text={"+ " + I18n.t('enrollstudent', {locale: this.props.locale})}
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
      { this._renderModal() }
      </View>
    );

  }
}

const viewStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 16,
    paddingLeft: 16,
  },
  modalContent: {
    marginTop: 16
  },
});

const mapStateToProps = (state, props) => {
  const course = state.courses.find((course) => course.id === props.navigation.state.params.courseId)
  return {
    course: course,
    isLoading: state.config.isLoading,
    online: state.offline.online,
    locale: state.config.locale,
  };
}

export default connect(mapStateToProps, null)(ViewCourseScreen);
