import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';

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
    this._fetchTeacher = this._fetchTeacher.bind(this);
    this._renderTeacher = this._renderTeacher.bind(this);
    this.state = {
      teacher : this.props.navigation.state.params.teacher,
      isLoading : true,
    }
  }

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
          headerRight: <Button title="Edit" onPress={() => params.handleEdit()} />
      };
  };

  componentDidMount() {
    _editProfile = () => {
       this.props.navigation.navigate('EditTeacherProfile',
        { refreshTeacher: this._fetchTeacher, teacher: this.state.teacher })
     }

    this._fetchTeacher();
    this.props.navigation.setParams({ handleEdit: _editProfile });

  }

  _fetchTeacher() {
    const successFunc = (responseData) => {
      this.setState({ teacher: responseData, isLoading: false });
    }
    getRequest(APIRoutes.getTeacherPath(this.state.teacher.id), successFunc, standardError);
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
            {this.state.teacher.first_name} {this.state.teacher.last_name}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Dream ID
            </Text>
            <Text style={textStyles.body}>
            {this.state.teacher.dream_id}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Email
            </Text>
            <Text style={textStyles.body}>
            {this.state.teacher.email}
            </Text>
          </View>

          <View style={formViewStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Phone Number
            </Text>
            <Text style={textStyles.body}>
            {this.state.teacher.phone}
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
    let teachers;
    if (this.state.isLoading) {
      teacher = (
        <Text>Loading...</Text>
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  }
}

export default connect(null, mapDispatchToProps)(TeacherProfileScreen);
