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


class StudentPersonalDetailsForm extends React.Component {
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
        first_name__c: this.props.first_name__c,
        last_name__c: this.props.last_name__c,
        date_of_birth__c: this.props.date_of_birth__c,
        nickname__c: this.props.nickname__c,
        // is_active: this.props.is_active,
        sex__c: this.props.sex__c
      });
    }
  }

  /*
   * Define fields in form.
   */
  _getFormType() {
    return t.struct({
      first_name__c: t.String,
      last_name__c: t.String,
      nickname__c: t.maybe(t.String),
      // is_active: t.maybe(t.enums({
      //   Yes: "Yes",
      //   No: "No",
      // })),
      date_of_birth__c: t.String,
      sex__c: t.maybe(t.enums({
        Female: 'Female',
        Male: 'Male'
      })),
    });
  }

  /*
   * Specify options for form fields.
   */
  _getFormOptions() {
    return {
      error: this.state.errors,
      fields: {
        first_name__c: {
          label: '*First Name'
        },
        last_name__c: {
          label: '*Last Name'
        },
        nickname__c: {
          label: 'Nickname'
        },
        // is_active: {
        //   label: 'Active Participant?'
        // },
        date_of_birth__c: {
          label: '*Birthday'
        },
        sex__c: {
          label: 'Sex'
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
        text='Next: Contact Information'
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

export default StudentPersonalDetailsForm;
