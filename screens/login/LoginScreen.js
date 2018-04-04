import React from 'react';

import { connect } from 'react-redux';
import actions from '../../actions';

import StyledButton from '../../components/Button/Button';
import { Button, ScrollView, Text, TextInput, View, Image, StyleSheet } from 'react-native';
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import { textStyles } from '../../styles/textStyles';


class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  _attemptLogin() {
    if (this.state.email == "1") {
      this.state.email = "user1@gmail.com";
      this.state.password = "password";
    } if (this.state.email == "2") {
      this.state.email = "user2@gmail.com";
      this.state.password = "password";
    }

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
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
        style={styles.bg}
        source={require('../../img/log_in.png')}>
          <View style={styles.container}>
            <Text style={textStyles.titleSmallLight}>Email</Text>
            <TextInput style={styles.textInput}
              autoCapitalize='none'
              onChangeText={(text) => this.setState({email: text})}/>
            <Text style={textStyles.titleSmallLight}>Password</Text>
            <TextInput style={styles.textInput}
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry/>
          </View>
          <StyledButton
            onPress={this._attemptLogin.bind(this)}
            text='Login'
            whiteButtonLarge>
          </StyledButton>

          <StyledButton
            onPress={() => this.props.navigation.navigate('SignUp')}
            text='Sign Up'
            secondaryButtonLarge>
          </StyledButton>
        </Image>
      </View>

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
        //TODO: (Aivant) We shouldn't dispatch actions in case of error here since if the fetch request fails, this error function doesn't get called
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

const styles = StyleSheet.create({
  bg: {
    backgroundColor:'transparent',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff'

  },
  container: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 180,
    alignSelf: 'stretch'
  }
});

export default connect(null, mapDispatchToProps)(LoginScreen);
