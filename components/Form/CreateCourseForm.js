 import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Form, t } from '../../components/Form/Form';
import { formStyles } from '../Form/styles.js';
import { timeFormat, dateFormat } from '../../lib/datetime_formats';
import { frontendError } from '../../lib/alerts';
import { textStyles } from '../../styles/textStyles';
import { commonStyles } from '../../styles/styles';
import StyledButton from '../Button/Button';
import Session from '../Session';

/**
 * @prop onSaveCourse - callback function when course create form is submitted
 * @prop refreshCourses - callback function to refresh CoursesScreen
 * @prop newCourse - true if creating new course, false if editing a course
 * @prop course_id - id of course
 * @prop is_active - true if course is ative (within the start and end date)
 * @prop title - course title
 * @prop teacher1 - dream_id of teacher 1
 * @prop teacher2 - dream_id of teacher 2
 * @prop start_date - start date of course
 * @prop end_date - end date of course
 * @prop sessionList - list of session records
 */
class CreateCourseForm extends React.Component {

  constructor(props) {
    super(props);

    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._getFormType = this._getFormType.bind(this);
    this._getFormOptions = this._getFormOptions.bind(this);
    this._clearFormErrors = this._clearFormErrors.bind(this);
    this._onFormChange = this._onFormChange.bind(this);

    this._handleSaveCourse = this._handleSaveCourse.bind(this);
    this._renderSaveCourseButton = this._renderSaveCourseButton.bind(this);

    this.state = {
      formValues: this._getInitialFormValues(),
      errors: [],
    }
  }

  /*
   * Populate form if fields already exist.
   */
  _getInitialFormValues() {
    let values = {
      is_active: this.props.is_active,
      title__c: this.props.title__c,
      facilitator_1__c: this.props.facilitator_1__c,
      facilitator_2__c: this.props.facilitator_2__c,
    };
    if (this.props.start_date__c) {
      values.start_date__c = new Date(this.props.start_date__c)
    }
    if (this.props.start_date__c) {
      values.end_date__c = new Date(this.props.end_date__c)
    }
    return values
  }

  /*
   * Define fields in form.
   */
  _getFormType() {
    return t.struct({
      title__c: t.String,
      facilitator_1__c: t.String,
      facilitator_2__c: t.maybe(t.String),
      program__c: t.String,
      start_date__c: t.Date,
      end_date__c: t.Date,
    });
  }

  /*
   * Specify options for form fields.
   */
  _getFormOptions() {
    return {
      error: this.state.errors,
      fields: {
        title__c: {
          label: 'Title',
        },
        facilitator_1__c: {
          label: 'Teacher Email 1',
          autoCapitalize: 'none',
        },
        facilitator_2__c: {
          label: 'Teacher Email 2 (optional)',
          autoCapitalize: 'none',
        },
        program__c: {
          label: 'Program',
        },
        start_date__c: {
          label: 'Start Date',
          mode:'date',
          config: {
            format:dateFormat,
          }
        },
        end_date__c: {
          label: 'End Date',
          mode:'date',
          config: {
            format:dateFormat,
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
   * Update component state each time a form field changes.
   */
  _onFormChange(values) {
    const today = new Date();
    if (values.end_date__c && values.end_date__c < today) {
      values.is_active = false
    } else {
      values.is_active = true
    }

    this.setState({ formValues: values });
  }

  /*
   * Extract values from form and call onSaveCourse callback.
   */
  _handleSaveCourse() {
    this._clearFormErrors();
    const values = this.form.getValue();
    if (values) {
      this.props.onSaveCourse({ course: values, sessions: this.state.sessionList })
    } else {
      frontendError("Validation failed.")
    }
  }

  /*
   * Return the save course button component.
   */
  _renderSaveCourseButton() {
    return (
      <StyledButton
        onPress={this._handleSaveCourse}
        text='Save'
        primaryButtonLarge>
      </StyledButton>
    );
  }

  render() {
    return (
      <View style={commonStyles.containerStatic}>
        <ScrollView>
          <View style={formStyles.container}>
            <Form
              refCallback={(ref) => this.form = ref}
              type={this._getFormType()}
              options={this._getFormOptions()}
              value={this.state.formValues}
              onChange={this._onFormChange}
            />
            </View>
        </ScrollView>
        { this._renderSaveCourseButton() }
      </View>
    );
  }
}

export default CreateCourseForm;
