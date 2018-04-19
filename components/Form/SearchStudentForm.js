import React from 'react';
import { Button, Text, ScrollView, View } from 'react-native';
import StyledButton from '../../components/Button/Button';
import { InputField, PickerField,
  DatePickerField, TimePickerField } from 'react-native-form-generator';
import { formStyles } from "./styles";
import { t } from '../../components/Form/Form';
import { APIRoutes } from '../../config/routes';
import PropTypes from 'prop-types';
import { frontendError } from '../../lib/alerts';

var Form  = t.form.Form;

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

  /*
   * Define fields in form.
   */
  _getFormType() {
    return t.struct({
      first_name: t.String,
      last_name: t.String,
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={formStyles.background}>
          <View style={formStyles.container}>
            <Form
              ref="form"
              type={this._getFormType()}
              onChange={this._handleFormChange.bind(this)}
              value={this.state.formValues}
            />
          </View>
          <StyledButton
            onPress={this._handleSearchStudent}
            text='Search Existing Student'
            primaryButtonLarge
          />
        </View>
      </ScrollView>
    );
  }
}

export default SearchStudentForm;
