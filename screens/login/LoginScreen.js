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
    const params = {
      user: {
        email: this.state.email,
        password: this.state.password,
      }
    }
    this.props.fetchTeacher(params, this.props.navigation);
    //TODO: Logging in should not push onto the stack. it should replace current
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor:'#3F51B5'}}>
          
          <Text style={{color: '#FFFFFF', fontSize: 32, fontWeight: '700', marginTop: 120, textAlign: 'center'}}>The DREAM Project</Text>
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
            whiteButtonOutlineLarge>
          </StyledButton>
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
    backgroundColor:'#7E57C2',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff', 
    fontSize: 16

  },
  container: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 60,
    alignSelf: 'stretch'
  }
});

export default connect(null, mapDispatchToProps)(LoginScreen);
