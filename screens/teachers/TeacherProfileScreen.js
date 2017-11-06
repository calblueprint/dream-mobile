import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';
import { teacherStyles } from '../../styles/teacherStyles';
import { commonStyles } from '../../styles/styles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

class TeacherProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this._fetchTeacher = this._fetchTeacher.bind(this);
    this._renderTeacher = this._renderTeacher.bind(this);
    this.state = {
      teacher : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchTeacher();
  }

  _fetchTeacher() {
    const successFunc = (responseData) => {
      this.setState({ teacher: responseData, isLoading: false });

    }
    const errorFunc = (error) => {
      console.error(error);
    }
    getRequest(APIRoutes.getTeacherPath(1), successFunc, errorFunc);

  }

  _renderTeacher() {
    return(
      <View style={teacherStyles.base}>
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
      <ScrollView>
        <View>
          { teacher }

          <Button
             title="Edit Profile" onPress={()=>{ navigate('EditTeacherProfile', 
              { refreshTeacher: this._fetchTeacher, teacher: this.state.teacher }); }} 
          />
        </View>
      </ScrollView>
    );

  }

  static navigationOptions = ({navigation}) => ({
      headerRight: 
        <Button
           title="Edit Profile" onPress={()=>{ navigation.navigate('EditTeacherProfile', 
            { refreshTeacher: this._fetchTeacher, teacher: this.state.teacher }); }} 
        />

  });

}

export default TeacherProfileScreen;
