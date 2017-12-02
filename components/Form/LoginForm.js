import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Form, t } from '../../components/Form/Form';
import StyledButton from '../../components/Button/Button';
import { APIRoutes } from '../../config/routes';
import colors from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';
import { frontendError } from '../../lib/alerts';
import { formStyles } from '../Form/styles.js';
import { commonStyles } from '../../styles/styles';

/**
 * @prop
 */

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this._getFormType = this._getFormType.bind(this);
    this._getFormOptions = this._getFormOptions.bind(this);
    this._clearFormErrors = this._clearFormErrors.bind(this);
    this._onFormChange = this._onFormChange.bind(this);

    this._handleLogin = this._handleLogin.bind(this);
    this._renderLoginButton = this._renderLoginButton.bind(this);

    this._handleSignup = this._handleSignup.bind(this);
    this._renderSignupButton = this._renderSignupButton.bind(this);

    this.state = {
      formValues: {},
      errors: [],
    }
  }

  /*
   * Define fields in form.
   */
  _getFormType() {
    return t.struct({
      email: t.String,
      password: t.String,
    });
  }

  /*
   * Specify options for form fields.
   */
  _getFormOptions() {
    return {
      error: this.state.errors,
      fields: {
        email: {
          label: 'Email',
          autoCapitalize: 'none',
        },
        password: {
          label: 'Password',
          password: true,
          secureTextEntry: true
        },
      },
    };
  }

  /*
   * Clear the error state at the beginning of each validation (login)
   */
  _clearFormErrors() {
    this.setState({ errors: [] });
  }

  /*
   * Update component state each time a form field changes.
   */
  _onFormChange(values) {
    this.setState({ formValues: values });
  }

  /*
   * Extract values from form and call onLogin callback.
   */
  _handleLogin() {
    this._clearFormErrors();
    const values = this.form.getValue();
    if (values) {
      console.log("Login!!!")
    } else {
      frontendError("Validation failed. Profile not updated.")
    }
  }

  /*
   * Render button to login
   */
  _renderLoginButton() {
    return (
      <StyledButton
        onPress={this._handleLogin}
        text='Login'
        primaryButtonSmall>
      </StyledButton>
    );
  }

  /*
   * Extract values from form and call onSignup callback.
   */
  _handleSignup() {
    this._clearFormErrors();
    const values = this.form.getValue();
    if (values) {
      console.log("Signup!!!!")
    } else {
      frontendError("Validation failed. Profile not updated.")
    }
  }

  /*
   * Render button to signup
   */
  _renderSignupButton() {
    return (
      <StyledButton
        onPress={this._handleSignup}
        text='Signup'
        primaryButtonSmall>
      </StyledButton>
    );
  }

  render() {
    return (
      <View style={formStyles.container}>
        <Form
          refCallback={(ref) => this.form = ref}
          type={this._getFormType()}
          options={this._getFormOptions()}
          value={this.state.formValues}
          onChange={this._onFormChange}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          { this._renderLoginButton() }
          { this._renderSignupButton() }
        </View>
      </View>
    );
  }
}

export default LoginForm;
