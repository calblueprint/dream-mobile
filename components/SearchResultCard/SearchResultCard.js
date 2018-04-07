import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { textStyles } from '../../styles/textStyles';

/**
 * @prop student - student information
 * @prop onSelectStudent - callback function to show student information
 */
class SearchResultCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("in SearchResultCard");
    console.log(this.props.student.first_name);
    return (
      <TouchableHighlight>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#E6E6E6'}}>
          <View style={{marginBottom: 16, marginTop: 16}}>
            <Text style={textStyles.body}>{this.props.student.first_name} {this.props.student.last_name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default SearchResultCard;
