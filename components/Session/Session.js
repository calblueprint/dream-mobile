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
import { frontendError } from '../../lib/alerts';

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
      formValues: this._getInitialFormValues(this.props),
      errors: [],
    }
  }

  /*
   * Force form fields to refresh when a session is deleted and props change.
   */
  componentWillReceiveProps (nextProps) {
    this.setState({ formValues: this._getInitialFormValues(nextProps) });
  }

  /*
   * Populate form if fields already exist.
   */
  _getInitialFormValues(props) {
    values = {
      weekday: props.weekday,
    };
    if (props.start_time) {
      values.start_time = new Date(props.start_time)
    } else {
      // Default start_time is 8AM
      start = new Date()
      start.setHours(8)
      start.setMinutes(0)
      values.start_time = start
    }
    if (props.end_time) {
      values.end_time = new Date(props.end_time)
    } else {
      // Default end_time is 9AM
      end = new Date()
      end.setHours(9)
      end.setMinutes(0)
      values.end_time = end
    }
    return values
  }

  /*
   * Define fields in form.
   */
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

  /*
   * Specify options for form fields.
   */
  _getFormOptions() {
    return {
      error: this.state.errors,
      fields: {
        weekday: {
          label: 'Day',
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

  /*
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
      this.setState({ formValues: values });
      this.props.onSessionChange(values, this.props.number);
    } else {
      frontendError("Validation failed. Session not updated.")
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
      <View style={formStyles.container}>
        <Text style={sessionStyles.headerText}>
          Session { this.props.number + 1 }
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
    );
  }
}

export default Session;
