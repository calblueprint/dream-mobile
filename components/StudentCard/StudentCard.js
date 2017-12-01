import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

/**
 * @prop student - student information
 * @prop onSelectStudent - callback function to show student information
 */
class StudentCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onSelectStudent(this.props.student.id)}>
        <View>
          <Text>{this.props.student.first_name} {this.props.student.last_name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default StudentCard;
