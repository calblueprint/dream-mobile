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
      <TouchableHighlight onPress={() => this.props.onSelectStudent(this.props.student)}
      underlayColor='transparent'>
        <View style={
          { backgroundColor: colors.courseWhite,
            borderWidth: 2,
            borderColor: '#CFD3EC',
            flex: 1,
            flexDirection: 'row',
            padding: 12,
            borderRadius: 8,
            marginTop: 8,
            marginBottom: 4
          }}>
          <View style={{flex: 0.9}}>
            <View style={{paddingBottom: 10}}>
              <Text style={[textStyles.titleMedium]}>
                {this.props.student.first_name} {this.props.student.last_name}
              </Text>
            </View>
            <Text style={[textStyles.titleSmall]}>
              Birthday: {this.props.student.birthday}
            </Text>
            <Text style={[textStyles.titleSmall]}>
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
