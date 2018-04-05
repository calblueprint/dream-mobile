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
    this._handleSearchStudent = this._handleSearchStudent.bind(this);
  }

  _handleSearchStudent(params) {
    console.log(params.student)
    const successFunc = (responseData) => {
      this.setState({ student: responseData});
      this.props.navigation.goBack(null);
    }
    postRequest(APIRoutes.getStudentsPath(), successFunc, standardError, params=params);
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
