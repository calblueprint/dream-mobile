import React from 'react';

import { connect } from 'react-redux';
import actions from '../../actions';
import LocalStorage from '../../helpers/LocalStorage'
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { getRequest, postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import SignUpForm from '../../components/Form/SignUpForm'

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this._attemptSignUp = this._attemptSignUp.bind(this);
    this.state = {
      teacher: { },
    }
  }

  _attemptSignUp(params) {
    const successFunc = (responseData) => {
      this.setState({teacher: responseData});
      LocalStorage.storeUser(responseData);
      console.log({teacher: responseData})
      this.props.navigation.navigate('Courses', {teacher: responseData});
    }
    const errorFunc = (error) => {
      console.error(error)
      this.props.navigation.navigate('Login');
    }
    const teacher_params = {
      teacher: params
    }
    // postRequest(APIRoutes.signupPath(), successFunc, errorFunc, teacher_params);
    this.props.fetchTeacher(teacher_params, this.props.navigation);
  }

  render() {
    return (
      <SignUpForm
          onSignUp={this._attemptSignUp}
      />
    );
  }
}

const fetchTeacher = (params, navigation) => {
  return (dispatch) => {
    dispatch(actions.requestTeacher(params));
    return getRequest(
      APIRoutes.signupPath(),
      (responseData) => {
        dispatch(actions.receiveTeacherSuccess(responseData));
        navigation.navigate('Courses');
      },
      (error) => {
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      },
      params
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeacher: (params, navigation) => dispatch(fetchTeacher(params, navigation)),
  }
}

export default connect(null, mapDispatchToProps)(SignUpScreen);
