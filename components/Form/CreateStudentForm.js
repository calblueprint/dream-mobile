import React from 'react';
import { Button, Text, View } from 'react-native';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';


/**
 * @prop onCreateStudent - callback function when student create form is submitted
 */
class CreateStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: {}
    }
  }

  _handleFormChange(studentData){
    //formData will be a json object that will contain refs of every field
    this.setState({studentData : studentData});
  }

  _handleFormFocus(event, reactNode) {
   this.refs.scroll.scrollToFocusedInput(event, reactNode);
  }

  render() {
    return (
      <View>
        <Form
          ref='registrationForm'
          onChange={this._handleFormChange.bind(this)}
          label="Personal Information">
          <InputField
            ref='first_name'
            label='First Name'
            // placeholder='e.g. Montessori'
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
              // placeholder='e.g. Montessori'
              validationFunction=
                {[(value)=>{
                  if(value == '') return "Last name required";
                  //Initial state is null/undefined
                  if(!value) return "Last name entered is invalid";
                  return true;
                }]}
              />

          <InputField
            ref='birthday'
            label='Birthday'
            // mode='date'
            type={'date'}
            options={{
              format: 'YYYY-MM-DD'
            }}
            placeholder='1997-10-16'/>

          <PickerField
            ref='year'
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
            label='Year'/>

          <InputField
            ref='address'
            label='Address'
            placeholder='e.g. 2514 Piedmont Ave, Berkeley, CA'
            />

          <InputField
            ref='nickname'
            label='Nickname'
            />

          <InputField
            ref='primary_contact'
            label='Primary Contact'
            />

          <InputField
            ref='primary_contact_relationship'
            label='Primary Contact Relationship'
            />

          <InputField
            ref='primary_contact_phone'
            label='Primary Contact Phone'
            />

          <InputField
            ref='primary_contact_phone2'
            label='Primary Contact Phone 2'
            />

        </Form>
        <Button
          onPress={() => this.props.onCreateStudent(this.state.studentData)}
          title='Create'
        />
      </View>
    );

  }
}

export default CreateStudentForm;
