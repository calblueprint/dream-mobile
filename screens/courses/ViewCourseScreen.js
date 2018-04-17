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
import { FontAwesome,Entypo } from '@expo/vector-icons';
import colors from '../../styles/colors';


class ViewCourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleSelectStudent = this._handleSelectStudent.bind(this);
    this._deleteCourse = this._deleteCourse.bind(this);
    this._renderDeleteCourseButton = this._renderDeleteCourseButton.bind(this);
    this._renderCourseDate = this._renderCourseDate.bind(this);
    this._renderSessions = this._renderSessions.bind(this);
    this._renderTeachers = this._renderTeachers.bind(this);
    this.state = {
      showModal: false
    }
  }

  componentDidMount() {
    const _enrollStudent = () => {
       this.props.navigation.navigate('CreateStudent',
        {course_id: this.props.course.id, newStudent: true })
     }

    this.props.navigation.setParams({ handleCreate: _enrollStudent });
  }

  _handleSelectStudent(id) {
    this.props.navigation.navigate('StudentProfile', {
      studentId: id,
      courseId: this.props.course.id
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
      <View style={{marginTop: 8}}>
        <Text style={textStyles.body}>{ course_start } to { course_end } </Text>
      </View>
    );
  }

  /*
   * Display course teachers.
   */
  _renderTeachers() {
    return this.props.course.teachers.map((teacher, index) => {
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
    if(this.props.course.sessions == []) { 
      return [];
    }
    return this.props.course.sessions.map((session, index) => {
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
        <ScrollView style={formViewStyles.base}>
          <View style={formViewStyles.div_1}>
            <View style={formViewStyles.div_2}>
              <Text style={textStyles.titleLarge}>{ this.props.course.title }</Text>

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
            onPress={() => {
                if(this.props.online) {
                  navigate('EditCourse',
                  {
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
            }
            text="Edit Course"
            linkButton
          />

          <View>{ this._renderDeleteCourseButton() }</View>

          <StyledButton
            onPress={() => navigate('RecentAttendances',
              { courseId: this.props.course.id})}
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
            onPress={() => {
                if(this.props.online) {
                  navigate('SearchStudent',
                          { refreshStudents: this._fetchStudents,
                            course_id: this.props.course.id, });
                } else {
                  this.setState({showModal: true})
                }
              }
            }
            text="+ Enroll Student"
            linkButton
          />
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
    isLoading: state.isLoading.value,
    online: !state.offline.online,
  };
}

export default connect(mapStateToProps, null)(ViewCourseScreen);
