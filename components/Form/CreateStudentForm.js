import React from 'react';
import { Button, Text, ScrollView, View } from 'react-native';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import { frontendError } from '../../lib/alerts';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';


import { Form, t } from '../../components/Form/Form';
import { formStyles } from '../Form/styles.js';
import StyledButton from '../Button/Button';

/**
 * @prop onCreateStudent - callback function when student create form is submitted
 */
class CreateStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._getFormType = this._getFormType.bind(this);
    this._handleFormChange = this._handleFormChange.bind(this);
    this._onFormChange = this._onFormChange.bind(this);
    this._handleSaveStudent = this._handleSaveStudent.bind(this);
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
    let values = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      birthday: this.props.birthday,
      address: this.props.address,
      dream_id: this.props.dream_id,
      nickname: this.props.nickname,
      primary_contact: this.props.primary_contact,
      primary_contact_phone: this.props.primary_contact_phone,
      is_active: this.props.is_active,
      sex: this.props.sex,
      facebook_name: this.props.facebook_name,
      notes: this.props.notes,
      document_type: this.props.document_type,
      level: this.props.level,
      phone: this.props.phone,
      phone_2: this.props.phone_2,
      email: this.props.email,
      primary_language: this.props.primary_language,
      past_dream_participant: this.props.past_dream_participant
    }
    return values
  }

  _handleSaveStudent() {
    if (this.state.formValues) {
      this.props.onSaveStudent({student: this.state.formValues})
    } else {
      frontendError("Student cannot be saved")
    }
  }

  /*
   * Define fields in form.
   */
  _getFormType() {
    return t.struct({
      first_name: t.String,
      last_name: t.String,
      birthday: t.String,
      address: t.String,
      // dream_id: t.String,
      nickname: t.String,
      primary_contact: t.String,
      primary_contact_phone: t.String,
      is_active: t.enums({
        true: "Yes",
        false: "No",
      }),
      sex: t.enums({
        Female: 'Female',
        Male: 'Male'
      }),
      facebook_name: t.maybe(t.String),
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
      phone: t.String,
      phone_2: t.String,
      email: t.String,
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
        first_name: {
          label: 'First Name'
        },
        last_name: {
          label: 'Last Name'
        },
        nickname: {
          label: 'Nickname'
        },
        is_active: {
          label: 'Active Participant?'
        },
        birthday: {
          label: 'Birthday'
        },
        sex: {
          label: 'Sex'
        },
        address: {
          label: 'Address'
        },
        phone: {
          label: 'Phone Number'
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
    return (
      <StyledButton
        onPress={this._handleSaveStudent}
        text='Save'
        primaryButtonLarge>
      </StyledButton>
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

export default CreateStudentForm;
