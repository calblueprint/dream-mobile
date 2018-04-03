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
class SearchStudentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <Form>

          <InputField
            ref='first_name'
            label='First Name'
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
            validationFunction=
              {[(value)=>{
                if(value == '') return "Last name required";
                //Initial state is null/undefined
                if(!value) return "Last name entered is invalid";
                return true;
              }]}
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

export default SearchStudentForm;
