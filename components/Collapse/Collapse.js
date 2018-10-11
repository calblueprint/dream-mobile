import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { commonStyles } from '../../styles/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import Collapsible from 'react-native-collapsible';

class Collapse extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='transparent'
          style={this.props.headerStyle}
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
  setCollapsed: PropTypes.func.isRequired,
  header: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  headerStyle: PropTypes.object,
};

export default Collapse;
