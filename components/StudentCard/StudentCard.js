import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { textStyles } from '../../styles/textStyles';

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
      <TouchableHighlight onPress={() => this.props.onSelectStudent(this.props.student.id)}
      underlayColor='transparent'>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#E6E6E6'}}>
          <View style={{marginBottom: 16, marginTop: 16}}>
            <Text style={textStyles.body}>{this.props.student.first_name__c} {this.props.student.last_name__c}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default StudentCard;
