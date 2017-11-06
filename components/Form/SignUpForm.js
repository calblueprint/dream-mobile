import React from 'react';
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
    this.state = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'asdf@gmail.com',
      password: 'asdfasdf',
      password_confimation: 'asdfasdf',
      dream_id: '1234',
      phone: '1234567890',
    }

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    this.props.onSignUp(this.state);
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder='First Name'
          value={this.state.first_name}
          onChangeText={(text) => this.setState({first_name: text})}/>
        <TextInput
          placeholder='Last Name'
          value={this.state.last_name}
          onChangeText={(text) => this.setState({last_name: text})}/>
        <TextInput
          placeholder='Email'
          value={this.state.email}
          autoCapitalize='none'
          onChangeText={(text) => this.setState({email: text})}/>
        <TextInput
          placeholder='Password'
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry/>
        <TextInput
          placeholder='Password Confirmation'
          value={this.state.password_confimation}
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry/>
        <TextInput
          placeholder='Dream ID'
          value={this.state.dream_id}
          onChangeText={(text) => this.setState({dream_id: text})}/>
        <TextInput
          placeholder='Phone Number'
          value={this.state.phone}
          onChangeText={(text) => this.setState({phone: text})}/>
        <Button
          onPress={this.onSignUp}
          title='Sign Up'
        />

      </View>
    );
  }
}

export default SignUpForm;