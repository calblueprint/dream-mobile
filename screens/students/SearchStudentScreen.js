import React from 'react';
import { View } from 'react-native';
import { APIRoutes } from '../../config/routes';
import { postRequest, putRequest } from '../../lib/requests';
import { standardError } from '../../lib/alerts';
import PropTypes from 'prop-types';
import SearchStudentForm from '../../components/Form/SearchStudentForm'

class SearchStudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleCreateStudent = this._handleCreateStudent.bind(this);
    this._handleUpdateStudent = this._handleUpdateStudent.bind(this);
  }

  _handleCreateStudent(params) {
    params.student.course_id = this.state.courseId;
      const successFunc = (responseData) => {
        this.setState({ student: responseData});
        this.props.navigation.goBack(null);
      }
    postRequest(APIRoutes.getStudentsPath(this.state.courseId), successFunc, standardError, params=params);
  }

  _handleUpdateStudent(params) {
    const successFunc = (responseData) => {
      // this.props.navigation.state.params.refreshStudent();
      this.props.navigation.navigate('Courses');
    }
    putRequest(APIRoutes.getStudentPath(this.state.student.id), successFunc, standardError, params=params);
  }

  render() {
    return (
       <View>
       <SearchStudentForm />
       </View>
    )
  }
}

export default SearchStudentScreen;
