import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Form, t } from '../../components/Form/Form';
import StyledButton from '../../components/Button/Button';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';
import { frontendError } from '../../lib/alerts';
import { formStyles } from '../Form/styles.js';
import { commonStyles } from '../../styles/styles';

/**
 * @prop teacher - teacher object information
 */

class EditTeacherForm extends React.Component {
  constructor(props) {
    super(props);

    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._getFormType = this._getFormType.bind(this);
    this._getFormOptions = this._getFormOptions.bind(this);
    this._clearFormErrors = this._clearFormErrors.bind(this);
    this._onFormChange = this._onFormChange.bind(this);

    this._handleSaveTeacher = this._handleSaveTeacher.bind(this);
    this._renderSaveButton = this._renderSaveButton.bind(this);

    this.state = {
      formValues: this._getInitialFormValues(this.props),
      errors: [],
    }
  }

  /*
   * Populate form if fields already exist.
   */
  _getInitialFormValues() {
    values = {
      first_name__c: this.props.teacher.first_name__c,
      last_name__c: this.props.teacher.last_name__c,
      // dream_id: this.props.teacher.dream_id,
      email__c: this.props.teacher.email__c,
      phone_number_1__c: this.props.teacher.phone_number_1__c,
    };
    return values
  }

  /*
   * Define fields in form.
   */
  _getFormType() {
    return t.struct({
      first_name__c: t.String,
      last_name__c: t.String,
      // dream_id: t.Number,
      email__c: t.String,
      phone_number_1__c: t.String,
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
          label: 'First Name',
        },
        last_name__c: {
          label: 'Last Name',
        },
        // dream_id: {
        //   label: 'Dream ID',
        // },
        email__c: {
          label: 'Email',
        },
        phone_number_1__c: {
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
   * Extract values from form and call onEditTeacher callback.
   */
  _handleSaveTeacher() {
    this._clearFormErrors();
    const values = this.form.getValue();
    if (values) {
      this.props.onEditTeacher({ teacher: values })
    } else {
      frontendError("Validation failed. Profile not updated.")
    }
  }

  /*
   * Render button to edit the teacher info.
   */
  _renderSaveButton() {
    return (
      <StyledButton
        onPress={this._handleSaveTeacher}
        text='Save'
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
        { this._renderSaveButton() }
      </View>
    );
  }
}

export default EditTeacherForm;
