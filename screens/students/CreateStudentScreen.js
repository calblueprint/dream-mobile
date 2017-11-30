import React from 'react';
import { APIRoutes } from '../../config/routes';
import { postRequest } from '../../lib/requests';
import { standardError } from '../../lib/alerts';
import PropTypes from 'prop-types';
import CreateStudentForm from '../../components/Form/CreateStudentForm'

class CreateStudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.navigation.state.params.courseId,
    }
  }

  _handleCreateStudent(params) {
    params.course_id = this.state.courseId;

    const successFunc = (responseData) => {
      this.props.navigation.state.params.refreshStudents();
      this.props.navigation.goBack(null);
    }
    postRequest(APIRoutes.getStudentsPath(this.state.courseId), successFunc, standardError, params);
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <CreateStudentForm
        onCreateStudent={this._handleCreateStudent.bind(this)} />
    );
  }
}

export default CreateStudentScreen;
