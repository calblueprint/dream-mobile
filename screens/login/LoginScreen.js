import React from 'react';

import { connect } from 'react-redux';
import actions from '../../actions';

import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/styles';
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import LoginForm from '../../components/Form/LoginForm'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  _attemptLogin() {
    const params = {
      teacher: {
        email: this.state.email,
        password: this.state.password,
      }
    }
    this.props.fetchTeacher(params, this.props.navigation);
  }

  render() {
    return (
      <LoginForm />
    );
  }
}

const fetchTeacher = (params, navigation) => {
  return (dispatch) => {
    dispatch(actions.requestTeacher(params));
    return postRequest(
      APIRoutes.loginPath(),
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

export default connect(null, mapDispatchToProps)(LoginScreen);
