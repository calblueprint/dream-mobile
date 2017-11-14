import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal, TouchableHighlight } from 'react-native';
import { Select, Option } from 'react-native-chooser';
import styles from './styles';
import { textStyles } from '../../styles/textStyles';

class Dropdown extends React.Component {
  /**
    * Takes in options (which is a dict of value:label pairs) and renders a list of
    * options with the value=value and displays the label
    */
  renderOptions() {
    return Object.keys(this.props.options).map((value, i) => {
      return(
        <Option key={i} value={value}>{this.props.options[value]}</Option>
      );
    });
  }

  /**
    * Returns either default styles for dropdown or combines styles from props with default styles
    * (styles from props should override defaults)
    */
  getStyles() {
    if (this.props.styles) {
      return {
        style: [styles.style, this.props.styles.style],
        textStyle: [textStyles.buttonText, this.props.styles.textStyle],
        backdropStyle: [styles.backdropStyle, this.props.styles.backdropStyle],
        optionListStyle: [styles.optionListStyle, this.props.styles.optionListStyle],
      }
    } else {
      return styles
    }
  }

  render() {
    const dropdownStyles = this.getStyles()
    console.log(this.props.optionsColor)
    return (
      <View>
        <Select
            transparent={true}
            onSelect={this.props.onSelect}
            defaultText={this.props.defaultText ? this.props.defaultText : this.props.value}
            style={ [dropdownStyles.style, {backgroundColor: this.props.optionsColor}] }
            textStyle={dropdownStyles.textStyle}
            backdropStyle ={dropdownStyles.backdropStyle}
            optionListStyle={dropdownStyles.optionListStyle}
          >
          {this.renderOptions()}
        </Select>
      </View>
    );
  }
}

Dropdown.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  value: React.PropTypes.any.isRequired,
  options: React.PropTypes.object.isRequired,
  defaultText: React.PropTypes.string.isRequired,
  styles: React.PropTypes.object,
};

export default Dropdown;
