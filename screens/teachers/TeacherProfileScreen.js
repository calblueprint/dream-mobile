import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';
import { teacherStyles } from '../../styles/teacherStyles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

class TeacherProfileScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    // const { navigate } = this.props.navigation;
      headerRight: 
        <Button
           title="Edit Profile" onPress={()=>{ navigation.navigate('EditTeacherProfile'); }}  
        />

  });

  constructor(props) {
    super(props);
    this._fetchTeachers = this._fetchTeachers.bind(this);
    this._renderTeachers = this._renderTeachers.bind(this);
    this.state = {
      teachers : { },
      isLoading : true,
    }
  }

  componentDidMount() {
    this._fetchTeachers();
  }

  _fetchTeachers() {
    const successFunc = (responseData) => {
      this.setState({ teachers: responseData, isLoading: false });
    }
    const errorFunc = (error) => {
      console.error(error);
    }
    getRequest(APIRoutes.getTeachersPath(), successFunc, errorFunc);
  }

  _renderTeachers() {
    return this.state.teachers.map(function(teacher, i) {
      return(
        <View key={i} style={teacherStyles.base}>
          <View style={teacherStyles.div_1}>
            <View style={teacherStyles.div_2}>
            <Text style={textStyles.titleLarge}>
            {teacher.first_name} {teacher.last_name}
            </Text>
            </View>

            <View style={teacherStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Dream ID
            </Text>
            <Text style={textStyles.body}>
            {teacher.dream_id}
            </Text>
            </View>

            <View style={teacherStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Email
            </Text>
            <Text style={textStyles.body}>
            {teacher.email}
            </Text>
            </View>

            <View style={teacherStyles.div_2}>
            <Text style={textStyles.titleSmall}>
            Phone Number
            </Text>
            <Text style={textStyles.body}>
            {teacher.phone}
            </Text>
            </View>
          </View>
        </View>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    let teachers;
    if (this.state.isLoading) {
      teachers = (
        <Text>Loading...</Text>
      )
    } else {
      teachers = this._renderTeachers()
    }
    return (
      <ScrollView>
        <View>
          { teachers }
        </View>
      </ScrollView>
    );

  }
}


export default TeacherProfileScreen;
