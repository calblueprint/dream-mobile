/**
 * Session Form component for course creation and editing.
 */

import React from 'react';
import { Text, View } from 'react-native';
import { Form, t } from '../../components/Form/Form';
import StyledButton from '../Button/Button';
import { formStyles } from '../Form/styles.js';
import { timeFormat } from '../../lib/datetime_formats';
import { sessionStyles } from './styles';

/**
 * @prop weekday - session weekday
 * @prop start_time - session start time
 * @prop end_time - session end time
 * @prop number - session number in list (determines order of sessions shown)
 * @prop onSessionChange - callback function when session fields are changed
 * @prop onSessionDelete - callback function to delete a session
 */
class Session extends React.Component {

  constructor(props) {
    super(props);

    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._getFormType = this._getFormType.bind(this);
    this._getFormOptions = this._getFormOptions.bind(this);
    this._clearFormErrors = this._clearFormErrors.bind(this);

    this._handleSessionChange = this._handleSessionChange.bind(this);
    this._renderDeleteSessionButton = this._renderDeleteSessionButton.bind(this);

    this.state = {
      formValues: this._getInitialFormValues(),
      errors: [],
    }
  }

  _getInitialFormValues() {
    return {
      weekday: this.props.weekday,
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
      weekday: Weekday,
      start_time: t.Date,
      end_time: t.Date,
    });
  }

  _getFormOptions() {
    return {
      error: this.state.errors,
      fields: {
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

  /*
   * Call the onSessionChange callback. Pass in the session number and form values.
   */
  _handleSessionChange() {
    this._clearFormErrors();
    const values = this.form.getValue();
    if (values) {
      values.modified = true;
      this.props.onSessionChange(values, this.props.number);
    } else {
      // TODO (casey): fix
      console.log("Validation failed!")
    }
  }

  /*
   * Return the button to delete the session.
   */
  _renderDeleteSessionButton() {
    return (
      <StyledButton
        onPress={() => this.props.onSessionDelete(this.props.number)}
        text='Delete Session'
        clearButtonSmall>
      </StyledButton>
    );
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
            onChange={this._handleSessionChange}
          />
          { this._renderDeleteSessionButton() }
        </View>
      </View>
    );
  }
}

export default Session;
