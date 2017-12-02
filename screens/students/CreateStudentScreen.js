import React from 'react';
import { View } from 'react-native';
import { APIRoutes } from '../../config/routes';
import { postRequest, putRequest } from '../../lib/requests';
import { standardError } from '../../lib/alerts';
import PropTypes from 'prop-types';
import CreateStudentForm from '../../components/Form/CreateStudentForm'

class CreateStudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleCreateStudent = this._handleCreateStudent.bind(this);
    this._handleUpdateStudent = this._handleUpdateStudent.bind(this);
    this.state = {
      courseId: this.props.navigation.state.params.courseId,
      student: this.props.navigation.state.params.student,
    }
  }

  _handleCreateStudent(params) {
    params.student.course_id = this.state.courseId;
      const successFunc = (responseData) => {
        this.setState({ student: responseData});
        this.props.navigation.state.params.refreshStudents();
        this.props.navigation.goBack(null);
      }
    postRequest(APIRoutes.getStudentsPath(this.state.courseId), successFunc, standardError, params=params);
  }

  _handleUpdateStudent(params) {
    const successFunc = (responseData) => {
      this.props.navigation.state.params.refreshStudent();
      this.props.navigation.goBack();
    }
    putRequest(APIRoutes.getStudentPath(this.state.student.id), successFunc, standardError, params=params);
  }

  render() {
    const navProps = this.state.student;
    if (this.props.navigation.state.params.newStudent) {
      return (
        <CreateStudentForm
          onSaveStudent={this._handleCreateStudent} />
      );
    } else {
      return (
         <View>
         <CreateStudentForm
            first_name={navProps.first_name}
            last_name={navProps.last_name}
            birthday={navProps.birthday}
            address={navProps.address}
            dream_id={navProps.dream_id}
            year={navProps.year}
            nickname={navProps.nickname}
            primary_contact={navProps.primary_contact}
            primary_contact_relationship={navProps.primary_contact_relationship}
            primary_contact_phone={navProps.primary_contact_phone}
            primary_contact_phone2={navProps.primary_contact_phone2}
            onSaveStudent={this._handleUpdateStudent} />
         </View>
      )
    }
  }
}

export default CreateStudentScreen;
