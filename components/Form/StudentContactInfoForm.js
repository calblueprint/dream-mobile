import React from 'react';
import { Button, Text, ScrollView, View } from 'react-native';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import { frontendError } from '../../lib/alerts';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';


import { Form, t } from '../../components/Form/Form';
import { formStyles } from '../../components/Form/styles.js';
import StyledButton from '../../components/Button/Button';


class StudentContactInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._getFormType = this._getFormType.bind(this);
    this._handleFormChange = this._handleFormChange.bind(this);
    this._onFormChange = this._onFormChange.bind(this);
    this._getFormOptions = this._getFormOptions.bind(this);
    this._renderSaveButton = this._renderSaveButton.bind(this);
    this._clearFormErrors = this._clearFormErrors.bind(this);
    this._handleSaveStudent = this._handleSaveStudent.bind(this);

    this.state = {
      formValues: this._getInitialFormValues(),
      errors: [],
    }
  }

  _handleFormChange(values){
    this.setState({ formValues : values });
  }

  _getInitialFormValues() {
    if (!this.props.newStudent) {
      return ({
        address: this.props.address,
        primary_contact: this.props.primary_contact,
        primary_contact_phone: this.props.primary_contact_phone,
        facebook_name: this.props.facebook_name,
        phone: this.props.phone,
        phone_2: this.props.phone_2,
        email: this.props.email
      });
    }
  }

  /*
   * Define fields in form.
   */
  _getFormType() {
    return t.struct({
      address: t.maybe(t.String),
      phone: t.String,
      phone_2: t.maybe(t.String),
      facebook_name: t.maybe(t.String),
      email: t.maybe(t.String),
      primary_contact: t.maybe(t.String),
      primary_contact_phone: t.maybe(t.String)
    });
  }

  /*
   * Specify options for form fields.
   */
  _getFormOptions() {
    return {
      error: this.state.errors,
      fields: {
        address: {
          label: 'Address'
        },
        phone: {
          label: '*Phone Number'
        }, 
        phone_2: {
          label: 'Alternate Phone Number'
        },
        facebook_name: {
          label: 'Name on Facebook'
        },
        email: {
          label: 'Email'
        },
        primary_contact: {
          label: 'Primary Contact Name'
        },
        primary_contact_phone: {
          label: 'Primary Contact Phone Number'
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
   * Extract values from form and call onSaveStudent callback.
   */
  _handleSaveStudent() {
    this._clearFormErrors();
    const values = this.form.getValue();
    if (values) {
      this.props.onSaveStudent(this.state.formValues)
    } else {
      frontendError("Validation failed.")
    }
  }

  /*
   * Return the save button component.
   */
  _renderSaveButton() {
    let button = this.props.newStudent? (
      <StyledButton
        onPress={this._handleSaveStudent}
        text='Next: Extra Information'
        primaryButtonLarge>
      </StyledButton>
    ) : (
      <StyledButton
        onPress={this._handleSaveStudent}
        text='Save Changes'
        primaryButtonLarge>
      </StyledButton>
    )

    return button;
  }

  /*
   * Update component state each time a form field changes.
   */
  _onFormChange(values) {
    this.setState({ formValues: values });
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
        { this._renderSaveButton() }
      </View>
    );
  }
}

export default StudentContactInfoForm;