import React from 'react';
import { View } from 'react-native';
import { APIRoutes } from '../../config/routes';
import { postRequest, putRequest } from '../../lib/requests';
import { standardError } from '../../lib/alerts';
import PropTypes from 'prop-types';
import StudentExtraInfoForm from '../../components/Form/StudentExtraInfoForm';

class StudentExtraInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleCreateStudent = this._handleCreateStudent.bind(this);
    this._handleUpdateStudent = this._handleUpdateStudent.bind(this);
    this.state = {
      course_id: this.props.navigation.state.params.course_id,
      navbarColor: this.props.navigation.state.params.navbarColor,
      newStudent: this.props.navigation.state.params.newStudent,
      savedFields: this.props.navigation.state.params.savedFields
    }
  }

  _handleUpdateStudent(params) {
    const studentId = this.props.navigation.state.params.student.id;
    const successFunc = (responseData) => {
      this.props.navigation.navigate('StudentProfile', {
        refreshStudents: this.props.navigation.state.params.refreshStudents,
        studentId: studentId,
        courseId: this.state.course_id,
        navbarColor: this.state.navbarColor,
      });
    }
    putRequest(APIRoutes.getStudentPath(studentId), 
      successFunc, standardError, params=params);
  }

  _handleCreateStudent(params) {
    const old = this.state.savedFields;
    const joined = Object.assign({}, old, params);
      const successFunc = (responseData) => {
        this.setState({ student: responseData});
        this.props.navigation.state.params.refreshStudents();
        this.props.navigation.navigate('ViewCourse', {
          course_id: this.state.course_id,
          navbarColor: this.state.navbarColor,
        });
      }
    postRequest(APIRoutes.getStudentsPath(), successFunc, standardError, params=joined);
  }

  render() {
    if (this.state.newStudent) {
      return (
        <View>
        <StudentExtraInfoForm
          newStudent={this.state.newStudent}
          onSaveStudent={this._handleCreateStudent} />
        </View>
      );
    } else {
      const navProps = this.props.navigation.state.params.student;
      return (
         <View>
         <StudentExtraInfoForm
            notes={navProps.notes}
            document_type={navProps.document_type}
            level={navProps.level}
            primary_language={navProps.primary_language}
            past_dream_participant={navProps.past_dream_participant}
            newStudent={this.state.newStudent}
            onSaveStudent={this._handleUpdateStudent} 
            />
         </View>
      )
    }
  }
}

export default StudentExtraInfoScreen;
