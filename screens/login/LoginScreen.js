import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { styles } from '../../styles/styles';
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "user1@gmail.com",
      password: "password",
      teacher: { },
    }
  }

  _attemptLogin() {
    const successFunc = (responseData) => {
      this.setState({teacher: responseData});
      this.props.navigation.navigate('Home');
    }
    const errorFunc = (error) => {
      console.error(error)
    }
    postRequest(APIRoutes.loginPath(), successFunc, errorFunc, params=parms);
  }

  render() {
    return (
      <View>
        <TextInput>
          placeholder='Email'
          onChangeText={(text) => this.setState({email: text})}
        </TextInput>
        <TextInput>
          placeholder='Password'
          onChangeText={(text) => this.setState({password: text})}
        </TextInput>
      </View>
    );
  }
}

export default LoginScreen;