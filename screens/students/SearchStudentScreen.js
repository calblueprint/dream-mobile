import React from 'react';
import { View } from 'react-native';
import { APIRoutes } from '../../config/routes';
import { getRequest } from '../../lib/requests';
import { standardError } from '../../lib/alerts';
import PropTypes from 'prop-types';
import SearchStudentForm from '../../components/Form/SearchStudentForm'

class SearchStudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleSearchStudent = this._handleSearchStudent.bind(this);

    this.state = {
      students: [],
    }
  }

  _handleSearchStudent(params) {
    params.first_name = params.student.first_name;
    params.last_name = params.student.last_name;
    const successFunc = (responseData) => {
      this.setState({students: responseData});
      this.props.navigation.navigate('SearchStudentResults', {
        students: responseData,
        refreshStudents: this.props.navigation.state.params.refreshStudents,
        course_id: this.props.navigation.state.params.course_id
      })
    }
    getRequest(APIRoutes.searchStudentPath(), successFunc, standardError, params=params);
  }

  render() {
    return (
       <View>
        <SearchStudentForm onSearchStudent={this._handleSearchStudent}/>
       </View>
    )
  }
}

export default SearchStudentScreen;
