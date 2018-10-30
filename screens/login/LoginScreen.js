import React from 'react';

import { connect } from 'react-redux';
import actions from '../../actions';
import I18n from '../../lib/i18n/i18n';
import colors from '../../styles/colors';
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
      isFetching: false,
    }
  }

  _attemptLogin() {
    if (this.state.isFetching) {
      return;
    }

    const params = {
      user: {
        email: this.state.email,
        password: this.state.password,
      }
    }
    this.setState({isFetching: true}, ()=>{
      this.props.fetchTeacher(params, this.props.navigation).then(()=>{
        this.setState({isFetching: false});
      });
    });
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
            text={I18n.t('login', {locale: this.props.locale})}
            whiteButtonLarge>
          </StyledButton>
          <StyledButton
            onPress={() => this.props.navigation.navigate('SignUp')}
            text={I18n.t('signup', {locale: this.props.locale})}
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
        console.log("logged in successfully")
        dispatch(actions.receiveTeacherSuccess(responseData));
        navigation.navigate('Courses');
      },
      (error) => {
        console.log("logged in with error")
        console.log(error)
        //TODO: (Aivant) We shouldn't dispatch actions in case of error here since if the fetch request fails, this error function doesn't get called
        //TODO: Standard Errors returned from rails won't inherently be localized
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      },
      params
    );
  }
}

const updateLocale = (locale) => {
  return (dispatch) => {
    dispatch(actions.updateLocale(locale));
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLocale: (locale) => dispatch(updateLocale(locale)),
    fetchTeacher: (params, navigation) => dispatch(fetchTeacher(params, navigation)),
  }
}

const mapStateToProps = (state, props) => {
    return {
      locale: state.config.locale
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
