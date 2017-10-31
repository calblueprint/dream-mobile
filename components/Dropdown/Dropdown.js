import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal, TouchableHighlight } from 'react-native';
import { Select, Option } from 'react-native-chooser';
import { commonStyles } from '../../styles/styles';
import styles from './styles';

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
        textStyle: [styles.textStyle, this.props.styles.textStyle],
        backdropStyle: [styles.backdropStyle, this.props.styles.backdropStyle],
        optionListStyle: [styles.optionListStyle, this.props.styles.optionListStyle],
      }
    } else {
      return styles
    }
  }

  render() {
    const dropdownStyles = this.getStyles()
    return (
      <View style={commonStyles.container}>
        <Select
            transparent={true}
            onSelect={this.props.onSelect}
            defaultText={this.props.defaultText ? this.props.defaultText : this.props.value}
            style={dropdownStyles.style}
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
};

export default Dropdown;
