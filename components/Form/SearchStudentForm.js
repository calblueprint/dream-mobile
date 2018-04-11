import React from 'react';
import { Button, Text, ScrollView } from 'react-native';
import { Form, InputField, PickerField,
  DatePickerField, TimePickerField } from 'react-native-form-generator';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import { frontendError } from '../../lib/alerts';

/**
 * @prop onSearchStudent - callback function when student search form is submitted
 */
class SearchStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this._handleSearchStudent = this._handleSearchStudent.bind(this);
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
    }
    return values
  }

  _handleSearchStudent() {
    if (this.state.formValues) {
      this.props.onSearchStudent({student: this.state.formValues})
    } else {
      frontendError("Error: cannot parse form values. Please try again")
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
          onPress={this._handleSearchStudent}
          title='Search Existing Student'
        />
      </ScrollView>
    );
  }
}

export default SearchStudentForm;
