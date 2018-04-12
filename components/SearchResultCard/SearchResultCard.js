import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { textStyles } from '../../styles/textStyles';
import {cardStyles} from "../CourseCard/styles";
import StyledButton from '../../components/Button/Button';
import colors from "../../styles/colors";

/**
 * @prop student - student information
 * @prop onSelectStudent - callback function to show student information
 */
class SearchResultCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onSelectStudent(this.props.student.id)}>
        <View style={[cardStyles.outerContainer, {backgroundColor: colors.courseGreen}]}>
          <View style={cardStyles.topContainer}>
            <Text style={[cardStyles.title, textStyles.titleMediumLight]}>
              {this.props.student.first_name} {this.props.student.last_name}
            </Text>
            <Text style={[cardStyles.count, textStyles.titleSmallLight]}>
              Birthday
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default SearchResultCard;
