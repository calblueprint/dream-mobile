import React from 'react';
import { Button, Text, ScrollView } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import { frontendError } from '../../lib/alerts';

/**
 * @prop onCreateStudent - callback function when student create form is submitted
 */
class CreateStudentForm extends React.Component {
  constructor(props) {
    super(props);

    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._handleFormChange = this._handleFormChange.bind(this);
    this._handleSaveStudent = this._handleSaveStudent.bind(this);


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

  render() {
    return (
      <ScrollView>
        <Form
          onChange={this._handleFormChange.bind(this)}
          value={this.state.formValues}
          >

          <Text> Personal Information </Text>
          <InputField
            ref='first_name'
            label='First Name'
            value={this.props.first_name}
            validationFunction=
              {[(value)=>{
                if(value == '') return "First name required";
                //Initial state is null/undefined
                if(!value) return "First name entered is invalid";
                return true;
              }]}
            />

            <InputField
              ref='last_name'
              label='Last Name'
              value={this.props.last_name}
              validationFunction=
                {[(value)=>{
                  if(value == '') return "Last name required";
                  //Initial state is null/undefined
                  if(!value) return "Last name entered is invalid";
                  return true;
                }]}
              />

          <InputField
            ref='nickname'
            label='Nickname'
            value={this.props.nickname}
            />

          <PickerField
            ref='is_active'
            label='Active Participant?'
            options={{
              true: "Yes",
              false: "No",
            }}
            value={this.props.is_active}/>

          <InputField
            ref='birthday'
            label='Birthday'
            value={this.props.birthday}
            type={'date'}
            placeholder='21 March 1998'/>

          <PickerField
            ref='sex'
            label='Sex'
            options={{
              Female: 'Female',
              Male: 'Male'
            }}
            value={this.props.sex}/>

          <Text> Contact Information </Text>
          <InputField
            ref='address'
            label='Address'
            value={this.props.address}
            placeholder='e.g. 2514 Piedmont Ave, Berkeley, CA'
            />

          <InputField
            ref='phone'
            label='Phone Number'
            value={this.props.phone}
            />

          <InputField
            ref='phone_2'
            label='Alternate Phone Number'
            value={this.props.phone_2}
            />

          <InputField
            ref='facebook_name'
            label='Name on Facebook'
            value={this.props.facebook_name}
            />

          <InputField
            ref='email'
            label='Email Address'
            value={this.props.email}
            />

          <InputField
            ref='primary_contact'
            label='Primary Contact Name'
            value={this.props.primary_contact}
            />

          <InputField
            ref='primary_contact_phone'
            label='Primary Contact Phone Number'
            value={this.props.primary_contact_phone}
            />

          <Text> Extra Information </Text>
          <InputField
            ref='notes'
            label='Notes (Optional)'
            value={this.props.notes}
            />

          <PickerField
            ref='level'
            label='Level (Montessori Only)'
            options={{Maternal: 'Maternal', 
            Kinder: 'Kinder', 
            'Pre-Primaria': 'Pre-Primaria', 
            Primero: 'Primero', 
            Segundo: 'Segundo'}}
            value={this.props.level}/>

          <PickerField
            ref='primary_language'
            label='Primary Language (Optional)'
            options={{Spanish: 'Spanish', 
            Creole: 'Creole', 
            Other: 'Other'}}
            value={this.props.primary_language}/>

          <PickerField
            ref='document_type'
            label='Document Type'
            options={{None: 'None', 
            'Govt. ID card': 'Govt. ID card', 
            'Passport or foreign birth certificate': 'Passport or foreign birth certificate', 
            'Regularization card': 'Regularization card', 
            'Dominican birth certificate': 'Dominican birth certificate', 
            'Dominican birth cetificate that says foreigner': 'Dominican birth cetificate that says foreigner'}}
            value={this.props.document_type}/>

          <PickerField
            ref='past_dream_participant'
            label='Participated in DREAM before? (Optional)'
            options={{true : "Yes",
            false : "No"
            }}
            value={this.props.past_dream_participant}/>

        </Form>
        <Button
          onPress={this._handleSaveStudent}
          title='Enroll Student'
        />
      </ScrollView>
    );

  }
}

export default CreateStudentForm;
