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


class StudentExtraInfoForm extends React.Component {
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
        notes__c: this.props.notes__c,
        tipo_de_documento__c: this.props.tipo_de_documento__c,
        // level: this.props.level,
        idioma_principal__c: this.props.idioma_principal__c,
        // past_dream_participant: this.props.past_dream_participant
      });
    }
  }

  /*
   * Define fields in form.
   */
  _getFormType() {
    return t.struct({
      notes__c: t.maybe(t.String),
      tipo_de_documento__c: t.maybe(t.enums({
        None: 'None', 
        'Govt. ID card': 'Govt. ID card', 
        'Passport or foreign birth certificate': 'Passport or foreign birth certificate', 
        'Regularization card': 'Regularization card', 
        'Dominican birth certificate': 'Dominican birth certificate', 
        'Dominican birth cetificate that says foreigner': 'Dominican birth cetificate that says foreigner'
      })),
      // level: t.maybe(t.enums({
      //   Maternal: 'Maternal', 
      //   Kinder: 'Kinder', 
      //   'Pre-Primaria': 'Pre-Primaria', 
      //   Primero: 'Primero', 
      //   Segundo: 'Segundo'
      // })),
      idioma_principal__c: t.maybe(t.enums({
        Spanish: 'Spanish', 
        Creole: 'Creole', 
        Other: 'Other'
      }))
      // past_dream_participant: t.maybe(t.enums({
      //   Yes : "Yes",
      //   No : "No"
      // }))
    });
  }

  /*
   * Specify options for form fields.
   */
  _getFormOptions() {
    return {
      error: this.state.errors,
      fields: {
        tipo_de_documento__c: {
          label: 'Document Type'
        },
        notes__c: {
          label: 'Notes'
        },
        // level: {
        //   label: 'Level'
        // },
        idioma_principal__c: {
          label: 'Primary Language'
        },
        // past_dream_participant: {
        //   label: 'Participated in DREAM before?'
        // },
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
        text='Create Student'
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

export default StudentExtraInfoForm;
