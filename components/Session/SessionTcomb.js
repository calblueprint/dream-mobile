/**
 * Session Form component for course creation and editing.
 */

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Form, t } from '../../components/Form/Form';
import StyledButton from '../Button/Button';
import { formStyles } from '../Form/styles.js';
import { timeFormat } from '../../lib/time';
import { sessionStyles } from './styles';

class SessionTcomb extends React.Component {

  constructor(props) {
    super(props);

    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._getFormType = this._getFormType.bind(this);
    this._getFormOptions = this._getFormOptions.bind(this);
    this._clearFormErrors = this._clearFormErrors.bind(this);
    this._onFormChange = this._onFormChange.bind(this);
    this._deleteSession = this._deleteSession.bind(this);

    this.state = {
      formValues: this._getInitialFormValues(),
      errors: [],
    }
  }

  _getInitialFormValues() {
    return {
      email: 'kenchen@berkeley.edu',
    };
  }

  _getFormType() {
    const Weekday = t.enums({
      'Sunday': 'Sunday',
      'Monday': 'Monday',
      'Tuesday': 'Tuesday',
      'Wednesday': 'Wednesday',
      'Thursday': 'Thursday',
      'Friday': 'Friday',
      'Saturday': 'Saturday',
    });
    return t.struct({
      email: t.String,
      weekday: Weekday,
      start_time: t.Date,
      end_time: t.Date,
    });
  }

  _getFormOptions() {
    return {
      error: this.state.errors,
      fields: {
        email: {
          value: 'kenchen@berkeley.edu',
        },
        start_time: {
          mode:'time',
          config: {
            format:timeFormat,
          }
        },
        end_time: {
          mode:'time',
          config: {
            format:timeFormat,
          }
        },
      },
    };
  }

  /**
   * Clear the error state at the beginning of each validation (login)
   */
  _clearFormErrors() {
    this.setState({ errors: [] });
  }

  _onFormChange(values) {
    this.setState({ formValues: values });
  }

  /**
   * Handles deleting a session.
   */
  _deleteSession() {
    this._clearFormErrors();
    const values = this.form.getValue();
    if (values) {
      console.log(values);
    } else {
      console.log("Validation failed!")
    }
  }

  render() {
    return (
      <View>
        <View style={formStyles.container}>
          <Text style={sessionStyles.headerText}>
            Session
          </Text>
          <Form
            refCallback={(ref) => this.form = ref}
            type={this._getFormType()}
            options={this._getFormOptions()}
            value={this.state.formValues}
            onChange={this._onFormChange}
          />
          <StyledButton
            onPress={this._deleteSession}
            text='Delete Session'
            clearButtonSmall>
          </StyledButton>
        </View>
      </View>
    );
  }
}

export default SessionTcomb;
