import React from 'react';
import LocalStorage from '../../helpers/LocalStorage'
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/styles';
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

/**
 * @prop onSignUp - callback function when signup form is submitted
 */
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this._onSignUp = this._onSignUp.bind(this);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confimation: '',
      dream_id: '',
      phone: '',
    }
  }

  _onSignUp() {
    this.props.onSignUp(this.state);
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder='First Name'
          onChangeText={(text) => this.setState({first_name: text})}/>
        <TextInput
          placeholder='Last Name'
          onChangeText={(text) => this.setState({last_name: text})}/>
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          onChangeText={(text) => this.setState({email: text})}/>
        <TextInput
          placeholder='Password'
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry/>
        <TextInput
          placeholder='Password Confirmation'
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry/>
        <TextInput
          placeholder='Dream ID'
          onChangeText={(text) => this.setState({dream_id: text})}/>
        <TextInput
          placeholder='Phone Number'
          onChangeText={(text) => this.setState({phone: text})}/>
        <Button
          onPress={this._onSignUp}
          title='Sign Up'
        />

      </View>
    );
  }
}

export default SignUpForm;