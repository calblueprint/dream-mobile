import React from 'react';
import LocalStorage from '../../helpers/LocalStorage'
import { ScrollView, Text, TextInput, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { Form, t } from '../../components/Form/Form';
import StyledButton from '../../components/Button/Button';
import colors from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';
import { frontendError } from '../../lib/alerts';
import { formStyles } from '../Form/styles.js';

/**
 * @prop onSignUp - callback function when signup form is submitted
 */
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this._getFormType = this._getFormType.bind(this);
    this._getFormOptions = this._getFormOptions.bind(this);
    this._clearFormErrors = this._clearFormErrors.bind(this);
    this._onFormChange = this._onFormChange.bind(this);

    this._handleSignUp = this._handleSignUp.bind(this);
    this._renderSignUpButton = this._renderSignUpButton.bind(this);

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
      first_name: t.String,
      last_name: t.String,
      email: t.String,
      password: t.String,
      password_confimation: t.String,
      phone_number: t.Number,
    });
  }

  /*
   * Specify options for form fields.
   */
  _getFormOptions() {
    return {
      error: this.state.errors,
      fields: {
        first_name: {
          label: 'First Name',
        },
        last_name: {
          label: 'Last Name',
        },
        email: {
          label: 'Email',
          autoCapitalize: 'none',
        },
        password: {
          label: 'Password',
          password: true,
          secureTextEntry: true
        },
        password_confimation: {
          label: 'Password Confirmation',
          password: true,
          secureTextEntry: true
        },
        phone_number_1: {
          label: 'Phone',
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
  _handleSignUp() {
    this._clearFormErrors();
    const values = this.form.getValue();
    if (values) {
      this.props.onSignUp(values);
    } else {
      frontendError("Validation failed. Profile not updated.")
    }
  }

  /*
   * Render button to login
   */
  _renderSignUpButton() {
    return (
      <StyledButton
        onPress={this._handleSignUp}
        text='Sign Up'
        primaryButtonLarge>
      </StyledButton>
    );
  }

  render() {
    return (
      <View style={commonStyles.containerStatic}>
        <ScrollView>
          <View style={formStyles.container}>
            <Form
              refCallback={(ref) => this.form = ref}
              type={this._getFormType()}
              options={this._getFormOptions()}
              value={this.state.formValues}
              onChange={this._onFormChange}
            />
          </View>
        </ScrollView>
        { this._renderSignUpButton() }
      </View>
    );
  }
}

export default SignUpForm;
