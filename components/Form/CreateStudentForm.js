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
      year: this.props.year,
      nickname: this.props.nickname,
      primary_contact: this.props.primary_contact,
      primary_contact_relationship: this.props.primary_contact_relationship,
      primary_contact_phone: this.props.primary_contact_phone,
      primary_contact_phone2: this.props.primary_contact_phone2,
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
            ref='dream_id'
            label='DREAM ID'
            value={this.props.dream_id}
            validationFunction=
                {[(value)=>{
                  if(value == '') return "DREAM ID required";
                  //Initial state is null/undefined
                  if(!value) return "DREAM ID entered is invalid";
                  return true;
                }]}
          />

          <InputField
            ref='birthday'
            label='Birthday'
            value={this.props.birthday}
            type={'date'}
            placeholder='1997-10-16'/>

          <PickerField
            ref='year'
            label='Year'
            options={{
              'one': '1',
              'two': '2',
              'three': '3',
              'four': '4',
              'five': '5',
              'six': '6',
              'seven': '7',
              'eight': '8',
              'nine': '9',
              'ten': '10',
              'eleven': '11',
              'twelve': '12',
            }}
            value={this.props.year}/>

          <InputField
            ref='address'
            label='Address'
            value={this.props.address}
            placeholder='e.g. 2514 Piedmont Ave, Berkeley, CA'
            />

          <InputField
            ref='nickname'
            label='Nickname'
            value={this.props.nickname}
            />

          <InputField
            ref='primary_contact'
            label='Primary Contact'
            value={this.props.primary_contact}
            />

          <InputField
            ref='primary_contact_relationship'
            label='Primary Contact Relationship'
            value={this.props.primary_contact_relationship}
            />

          <InputField
            ref='primary_contact_phone'
            label='Primary Contact Phone'
            value={this.props.primary_contact_phone}
            />

          <InputField
            ref='primary_contact_phone2'
            label='Primary Contact Phone 2'
            value={this.props.primary_contact_phone2}
            />

        </Form>
        <Button
          onPress={this._handleSaveStudent}
          title='Save'
        />
      </ScrollView>
    );

  }
}

export default CreateStudentForm;
