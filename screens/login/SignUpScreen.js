import React from 'react';
import LocalStorage from '../../helpers/LocalStorage'
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
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
      this.props.navigation.navigate('Home');
    }
    const errorFunc = (error) => {
      console.error(error)
    }
    const teacher_params = {
      teacher: params
    }
    postRequest(APIRoutes.signupPath(), successFunc, errorFunc, teacher_params);
  }

  render() {
    return (
      <SignUpForm
          onSignUp={this._attemptSignUp}
      />
    );
  }
}

export default SignUpScreen;