/**
 * Form object to gather user input and submit to API. This class
 * wraps the tcomb-form library and overrides many styles by default.
 * See below for more details. This form's parent component must use
 * `this.form.getValue()`, which will be set by a ref when the form
 * values are filled out, in order to retrieve the form information
 * and handle submission.
 *
 * @prop style - style override
 * @prop refCallback - callback function to set a ref on the parent to get this form's values
 * @prop type - object that specifies the form fields and types for each field
 * @prop options - options for customizing each form field, see the docs
 * @prop value - default values in form
 * @prop onChange - callback handler called every time the form changes
 */

import React from 'react';
import { Text, View, Platform } from 'react-native';
import colors from '../../styles/colors';
import t from 'tcomb-form-native';
const TForm = t.form.Form;

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.overrideStyles();
  }

  /**
   * Overrides default styles from form library.
   *
   * To override more defaults, refer to the master stylesheet:
   * https://github.com/gcanti/tcomb-form-native/blob/master/lib/stylesheets/bootstrap.js
   */
  overrideStyles() {
    let stylesheet = t.form.Form.stylesheet;

    const HEIGHT = 24;
    const PADDING_HORIZONTAL = 15;
    const LABEL_PADDING_TOP = 15;
    const MARGIN_BOTTOM = 4;
    const BACKGROUND_COLOR = colors.backgroundWhite;

    const INPUT_FONT_SIZE = 20;
    const INPUT_COLOR = colors.textDark;

    const LABEL_FONT_SIZE = 16;
    const LABEL_COLOR = colors.textDark_70;
    const LABEL_FONT_WEIGHT = '700';

    const ERROR_COLOR = colors.errorRed;
    const UNDERLINE_COLOR = colors.dividerGrey;
    const UNDERLINE_WIDTH = 1;
    const UNDERLINE_LENGTH = 0.5;

    const HELPBLOCK_FONT_SIZE = 13;

    // Textbox styles
    let textbox = stylesheet.textbox;
    textbox.normal = {
      color: INPUT_COLOR,
      fontSize: INPUT_FONT_SIZE,
      backgroundColor: BACKGROUND_COLOR,
      borderBottomColor: UNDERLINE_COLOR,
      borderBottomWidth: UNDERLINE_WIDTH,
      height: HEIGHT,
    };

    textbox.error = {
      color: INPUT_COLOR,
      fontSize: INPUT_FONT_SIZE,
      backgroundColor: BACKGROUND_COLOR,
      borderBottomColor: ERROR_COLOR,
      borderBottomWidth: UNDERLINE_WIDTH,
      borderWidth: 0,
    };

    // Picker container styles
    let picker = stylesheet.pickerContainer;
    picker.normal = {
      borderColor: 'transparent',
      height: HEIGHT,
    };

    let pickerValue = stylesheet.pickerValue;
    pickerValue.normal = {
      fontSize: INPUT_FONT_SIZE,
      color: INPUT_COLOR,
    };

    // Datepicker styles
    let datepicker = stylesheet.datepicker;
    datepicker.normal = {
      marginBottom: MARGIN_BOTTOM,
      borderColor: 'transparent',
    };

    let dateValue = stylesheet.dateValue;
    dateValue.normal = {
      fontSize: INPUT_FONT_SIZE,
      color: INPUT_COLOR,
    };

    // Label styles
    let label = stylesheet.controlLabel;
    label.normal = {
      color: LABEL_COLOR,
      fontSize: LABEL_FONT_SIZE,
      marginBottom: MARGIN_BOTTOM,
      fontWeight: LABEL_FONT_WEIGHT,
      paddingTop: LABEL_PADDING_TOP,
    };

    label.error = {
      color: ERROR_COLOR,
      fontSize: LABEL_FONT_SIZE,
      marginBottom: MARGIN_BOTTOM,
      fontWeight: LABEL_FONT_WEIGHT,
      paddingTop: LABEL_PADDING_TOP,
    };

    // Helpblock styles (help and error messages)
    let helpBlock = stylesheet.helpBlock;
    helpBlock.normal = {
      color: UNDERLINE_COLOR,
      fontSize: HELPBLOCK_FONT_SIZE,
      marginBottom: 2,
    };
    helpBlock.error = {
      color: ERROR_COLOR,
      fontSize: HELPBLOCK_FONT_SIZE,
      marginBottom: 2,
    };
    stylesheet.errorBlock = {
      color: ERROR_COLOR,
      fontSize: HELPBLOCK_FONT_SIZE,
      marginBottom: 2,
    };
  }

  render() {
    return (
      <TForm
        style={[this.props.style]}
        ref={this.props.refCallback}
        type={this.props.type}
        options={this.props.options}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export { Form, t };
