import React from 'react';
import LocalStorage from '../../helpers/LocalStorage'
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/styles';
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      teacher: { },
    }
  }

  _attemptLogin() {
    const successFunc = (responseData) => {
      LocalStorage.storeUser(responseData);
      this.props.navigation.navigate('Courses');
    }
    const params = {
      teacher: {
        email: this.state.email,
        password: this.state.password,
      }
    }
    postRequest(APIRoutes.loginPath(), successFunc, standardError, params);
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          onChangeText={(text) => this.setState({email: text})}/>
        <TextInput
          placeholder='Password'
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry/>
        <Button
          onPress={this._attemptLogin.bind(this)}
          title='Login'
        />
        <Button
          onPress={() => this.props.navigation.navigate('SignUp')}
          title='Sign Up'
        />

      </View>
    );
  }
}

export default LoginScreen;