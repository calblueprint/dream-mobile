import React from 'react';
import LocalStorage from '../../helpers/LocalStorage'
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/styles';
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

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
      console.log(responseData);
      LocalStorage.storeUser(responseData);
      this.props.navigation.navigate('Courses');
    }
    const errorFunc = (error) => {
      console.error(error)
    }
    const params = {
      teacher: {
        email: this.state.email,
        password: this.state.password,
      }
    }
    console.log(params);
    postRequest(APIRoutes.loginPath(), successFunc, errorFunc, params);
  }

  _attemptSignOut() {
    const successFunc = (responseData) => {
      this.setState({teacher: responseData});
      this.props.navigation.navigate('LoginScreen');
    }
    const errorFunc = (error) => {
      console.error(error)
    }
    deleteRequest(APIRoutes.signoutPath(), successFunc, errorFunc);
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
        <Button
          onPress={() => this._attemptSignOut.bind(this)}
          title='Sign Out'
        />

      </View>
    );
  }
}

export default LoginScreen;