import React from 'react';
import { Button, Text, View } from 'react-native';
import StyledButton from '../../components/Button/Button';
import { Form, InputField, PickerField,
         DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';

/**
 * @prop onSaveStudent - callback function when student create form is submitted
 */

class EditStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_active: this.props.is_active,
      first_name: this.props.first_name || '',
      last_name: this.props.last_name || '',
      birthday: this.props.birthday || '',
      year: this.props.year || '',
      address: this.props.address || '',
      nickname: this.props.nickname || '',
      primary_contact: this.props.primary_contact || '',
      primary_contact_relationship: this.props.primary_contact_relationship || '',
      primary_contact_phone: this.props.primary_contact_phone || '',
      primary_contact_phone2: this.props.primary_contact_phone2 || '',
    }
  }

  _handleFormChange(studentData){
    //formData will be a json object that will contain refs of every field
    this.setState({ ...studentData });
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
          label="Personal Information"
          >

          <InputField
            ref='first_name'
            label='First Name'
            value={this.state.first_name}
            validationFunction=
              {[(value)=>{
                if(value == '') return "First name required";
                //Initial state is null/undefined
                if(!value) return "First name required";
                return true;
              }]}
            />

          <InputField
            ref='last_name'
            label='Last Name'
            value={this.state.last_name}
            />

          <InputField
            ref='birthday'
            label='Birthday'
            value={this.state.birthday}
            />

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
            label='Year'
            value={this.state.year}
            />

          <InputField
            ref='address'
            label='Address'
            value={this.state.address}
            />

            <InputField
              ref='nickname'
              label='Nickname'
              value={this.state.nickname}
              />

            <InputField
              ref='primary_contact'
              label='Primary Contact'
              value={this.state.primary_contact}
              />

            <InputField
              ref='primary_contact_relationship'
              label='Primary Contact Relationship'
              value={this.state.primary_contact_relationship}
              />

            <InputField
              ref='primary_contact_phone'
              label='Primary Contact Phone'
              value={this.state.primary_contact_phone}
              />

            <InputField
              ref='primary_contact_phone2'
              label='Primary Contact Phone 2'
              value={this.state.primary_contact_phone2}
              />
        </Form>

        <Button
          onPress={() => this.props.onSaveStudent({ student: this.state })}
          title='Save'
        />

      </View>
    );
  }
}

export default EditStudentForm;
