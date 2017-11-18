import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { commonStyles } from '../../styles/styles';
import styles from './styles';
import Collapsible from 'react-native-collapsible';
import { textStyles } from '../../styles/textStyles';

class Collapse extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='transparent'
          style={this.props.headerStyle}
          textStyle={textStyles.body}
          onPress={this.props.setCollapsed}>
          {this.props.header}
        </TouchableHighlight>
        <Collapsible collapsed={this.props.isCollapsed}>
          {this.props.children}
        </Collapsible>
      </View>
    );
  }
}


Collapse.propTypes = {
  setCollapsed: React.PropTypes.func.isRequired,
  header: React.PropTypes.object.isRequired,
  isCollapsed: React.PropTypes.bool.isRequired,
  headerStyle: React.PropTypes.object,
};

export default Collapse;
