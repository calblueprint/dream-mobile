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

  render() {
    return (
      <View style={commonStyles.container}>
        <Select
            transparent={true}
            onSelect={this.props.onSelect}
            defaultText={this.props.defaultText ? this.props.defaultText : this.props.value}
            style={styles.style}
            textStyle={styles.textStyle}
            backdropStyle ={styles.backdropStyle}
            optionListStyle={styles.optionListStyle}
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
