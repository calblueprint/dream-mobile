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
    this._timeFormat = this._timeFormat.bind(this);
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

  /* Display time in HH:MM AM/PM format. */
  _timeFormat(date, mode) {
    if(!date) return "";
    let value=date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return value;
  }

  render() {
    const today = new Date();
    const minDate = new Date(today.getFullYear()-2, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear()+2, today.getMonth(), today.getDate());
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
            mode='date'
            format="YYYY-MM-DD"
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
