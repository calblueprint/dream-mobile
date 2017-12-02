import React from 'react';
import { Image, Button, Text, View, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import actions from '../../actions';

import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';
import { formViewStyles } from '../../styles/formViewStyles';
import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/alerts';
import PropTypes from 'prop-types';

class TeacherProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this._renderTeacher = this._renderTeacher.bind(this);
  }

  componentDidMount() {
    this.props.fetchTeacher(this.props.teacher);
  }

  _attemptSignOut() {
    this.props.logout();
    this.props.navigation.navigate('Login');
  }

  _renderTeacher() {
    return(
      <View>
        <View style={formViewStyles.div_1}>
          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleLarge}>
            {this.props.teacher.first_name} {this.props.teacher.last_name}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Dream ID
            </Text>
            <Text style={textStyles.body}>
            {this.props.teacher.dream_id}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Email
            </Text>
            <Text style={textStyles.body}>
            {this.props.teacher.email}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Phone Number
            </Text>
            <Text style={textStyles.body}>
            {this.props.teacher.phone}
            </Text>
          </View>

          <Button
          onPress={this._attemptSignOut.bind(this)}
          title='Sign Out'
          />

        </View>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let teacher;
    if (this.props.isLoading) {
      teacher = (
        <Image
          style={commonStyles.icon}
          source={require('../../icons/spinner.gif')}
        />
      )
    } else {
      teacher = this._renderTeacher()
    }
    return (
      <ScrollView style={formViewStyles.base}>
        { teacher }
      </ScrollView>
    );
  }
}

const fetchTeacher = (teacher) => {
  return (dispatch) => {
    dispatch(actions.requestTeacher(teacher));
    return getRequest(
      APIRoutes.getTeacherPath(teacher.id),
      (responseData) => {
        dispatch(actions.receiveTeacherSuccess(responseData));
      },
      (error) => {
        dispatch(actions.receiveStandardError(error));
        standardError(error);
      }
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher,
    isLoading: state.isLoading.value,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeacher: (teacher) => dispatch(fetchTeacher(teacher)),
    logout: () => dispatch(actions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfileScreen);
