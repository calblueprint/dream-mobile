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
      course_id: this.props.navigation.state.params.course_id,
      student: this.props.navigation.state.params.student,
    }
  }

  _handleCreateStudent(params) {
      const successFunc = (responseData) => {
        this.setState({ student: responseData});
        this.props.navigation.state.params.refreshStudents();
        this.props.navigation.goBack(null);
      }
    postRequest(APIRoutes.getStudentsPath(this.state.course_id), successFunc, standardError, params=params);
  }

  _handleUpdateStudent(params) {
    const successFunc = (responseData) => {
      // this.props.navigation.state.params.refreshStudent();
      this.props.navigation.navigate('Courses');
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
            nickname={navProps.nickname}
            primary_contact={navProps.primary_contact}
            primary_contact_phone={navProps.primary_contact_phone}
            is_active={navProps.is_active}
            sex={navProps.sex}
            facebook_name={navProps.facebook_name}
            notes={navProps.notes}
            document_type={navProps.document_type}
            level={navProps.level}
            phone={navProps.phone}
            phone_2={navProps.phone_2}
            email={navProps.email}
            primary_language={navProps.primary_language}
            past_dream_participant={navProps.past_dream_participant}
            onSaveStudent={this._handleUpdateStudent} />
         </View>
      )
    }
  }
}

export default CreateStudentScreen;
