import React from 'react';
import { Image, Button, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { APIRoutes } from '../../config/routes';
import { getRequest } from '../../lib/requests';
import { standardError } from '../../lib/alerts';
import StyledButton from '../../components/Button/Button';
import PropTypes from 'prop-types';
import SearchStudentForm from '../../components/Form/SearchStudentForm'
import {formStyles} from "../../components/Form/styles";

class SearchStudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleSearchStudent = this._handleSearchStudent.bind(this);

    this.state = {
      students: [],
      course_id: this.props.navigation.state.params.course_id,
      navbarColor: this.props.navigation.state.params.navbarColor
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
        course_id: this.state.course_id, 
        navbarColor: this.state.navbarColor,
      })
    }
    getRequest(APIRoutes.searchStudentPath(), successFunc, standardError, params=params);
  }

  render() {
    return (
       <View style={formStyles.background}>
         <View style={viewStyles.top}>
           <SearchStudentForm onSearchStudent={this._handleSearchStudent}/>
           <View style={viewStyles.buttonMargin}>
             <StyledButton
               onPress={() => this.props.navigation.navigate('StudentPersonalDetails',
                 { refreshStudents: this.props.navigation.state.params.refreshStudents,
                   course_id: this.state.course_id,
                   navbarColor: this.state.navbarColor,
                   newStudent: true })}
               text="+ Create Student"
               secondaryButtonLarge
             />
            </View>
         </View>
       </View>
    )
  }
}

const viewStyles = StyleSheet.create({
  top: {
    marginTop: 24,
  },
  buttonMargin: {
    marginTop: 8,
  }
});

export default SearchStudentScreen;
