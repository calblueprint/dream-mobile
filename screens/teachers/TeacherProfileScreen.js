import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';
import { teacherStyles } from '../../styles/teacherStyles';
import { commonStyles } from '../../styles/styles';
import { getRequest, deleteRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { standardError } from '../../lib/request_callbacks';
import PropTypes from 'prop-types';
import LocalStorage from '../../helpers/LocalStorage'


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
    LocalStorage.clearUser();
    this.props.navigation.navigate('Login');
  }

  _renderTeacher() {
    return(
      <View>
        <View style={teacherStyles.div_1}>
          <View style={teacherStyles.div_2}>
            <Text style={textStyles.titleLarge}>
            {this.state.teacher.first_name} {this.state.teacher.last_name}
            </Text>
          </View>

          <View style={teacherStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Dream ID
            </Text>
            <Text style={textStyles.body}>
            {this.state.teacher.dream_id}
            </Text>
          </View>

          <View style={teacherStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Email
            </Text>
            <Text style={textStyles.body}>
            {this.state.teacher.email}
            </Text>
          </View>

          <View style={teacherStyles.div_2}>
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
      <ScrollView style={teacherStyles.base}>
        { teacher }
      </ScrollView>
    );
  }
}

export default TeacherProfileScreen;
