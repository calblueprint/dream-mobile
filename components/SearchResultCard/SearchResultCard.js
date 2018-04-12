import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { textStyles } from '../../styles/textStyles';
import {cardStyles} from "../CourseCard/styles";
import StyledButton from '../../components/Button/Button';
import colors from "../../styles/colors";
import { FontAwesome } from '@expo/vector-icons';


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
        <View style={[
          cardStyles.outerContainer,
          { backgroundColor: colors.courseWhite,
            borderWidth: 1,
            borderColor: colors.courseBlue,
            flexDirection: 'row',
            padding: 10
          }]}>
          <View style={{flex: 0.9}}>
            <Text style={[cardStyles.title, textStyles.titleMedium]}>
              {this.props.student.first_name} {this.props.student.last_name}
            </Text>
            <Text style={[cardStyles.count, textStyles.titleSmall]}>
              Birthday: {this.props.student.birthday}
            </Text>
            <Text style={[cardStyles.count, textStyles.titleSmall]}>
              Address: {this.props.student.address}
            </Text>
          </View>
          <View style={{
            flex: 0.1,
            marginRight: 8,
            justifyContent: 'center',
            alignItems: 'flex-end'}}>
            <FontAwesome name="angle-right" size={32} color={colors.courseBlue} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default SearchResultCard;
