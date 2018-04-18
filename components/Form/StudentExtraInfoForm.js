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

/**
 * @prop onCreateStudent - callback function when student create form is submitted
 */
class StudentExtraInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._getFormType = this._getFormType.bind(this);
    this._handleFormChange = this._handleFormChange.bind(this);
    this._onFormChange = this._onFormChange.bind(this);
    this._getFormOptions = this._getFormOptions.bind(this);
    this._renderSaveButton = this._renderSaveButton.bind(this);

    this.state = {
      formValues: this._getInitialFormValues(),
    }
  }

  _handleFormChange(values){
    //formData will be a json object that will contain refs of every field
    this.setState({ formValues : values });
  }

  _getInitialFormValues() {
    if (!this.props.newStudent) {
      return ({
        notes: student.notes,
        document_type: student.document_type,
        level: student.level,
        primary_language: student.primary_language,
        past_dream_participant: student.past_dream_participant
      });
    }
  }

  /*
   * Define fields in form.
   */
  _getFormType() {
    return t.struct({
      notes: t.maybe(t.String),
      document_type: t.enums({
        None: 'None', 
        'Govt. ID card': 'Govt. ID card', 
        'Passport or foreign birth certificate': 'Passport or foreign birth certificate', 
        'Regularization card': 'Regularization card', 
        'Dominican birth certificate': 'Dominican birth certificate', 
        'Dominican birth cetificate that says foreigner': 'Dominican birth cetificate that says foreigner'
      }),
      level: t.maybe(t.enums({
        Maternal: 'Maternal', 
        Kinder: 'Kinder', 
        'Pre-Primaria': 'Pre-Primaria', 
        Primero: 'Primero', 
        Segundo: 'Segundo'
      })),
      primary_language: t.maybe(t.enums({
        Spanish: 'Spanish', 
        Creole: 'Creole', 
        Other: 'Other'
      })),
      past_dream_participant: t.maybe(t.enums({
        true : "Yes",
        false : "No"
      }))
    });
  }

  /*
   * Specify options for form fields.
   */
  _getFormOptions() {
    return {
      error: this.state.errors,
      fields: {
        document_type: {
          label: 'Document Type'
        },
        notes: {
          label: 'Notes (Optional)'
        },
        level: {
          label: 'Level (Montessori Only)'
        },
        primary_language: {
          label: 'Primary Language (Optional)'
        },
        past_dream_participant: {
          label: 'Participated in DREAM before? (Optional)'
        },
      },
    };
  }

  /*
   * Return the save button component.
   */
  _renderSaveButton() {
    let button = this.props.newStudent? (
      <StyledButton
        onPress={this.props.onSaveStudent}
        text='Create Student'
        primaryButtonLarge>
      </StyledButton>
    ) : (
      <StyledButton
        onPress={this.props.onSaveStudent}
        text='Save Changes'
        primaryButtonLarge>
      </StyledButton>
    )

    return (
      {button}
    );
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
