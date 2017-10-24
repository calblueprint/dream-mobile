import React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';
import { teacherStyles } from '../../styles/teacherStyles';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

class TeacherProfileScreen extends React.Component {
  static navigationOptions = {
  	headerRight: <Button title="Edit" />, 
  };	

  constructor(props) {
    super(props);
  }


  render() {
    return (
    	<ScrollView>
    	<View style={{flex: 4}}>
      	<View style={teacherStyles.viewStyles}>
      	<Text style={textStyles.titleMedium}>
      	John Denero
      	</Text>
      	</View>

      	<View style={teacherStyles.viewStyles}>
      	<Text style={textStyles.titleSmall}>
      	Dream ID
      	</Text>
      	<Text style={textStyles.body}>
      	123456789
      	</Text>
      	</View>

      	<View style={teacherStyles.viewStyles}>
      	<Text style={textStyles.titleSmall}>
      	Email
      	</Text>
      	<Text style={textStyles.body}>
      	johndenero@dream.org
      	</Text>
      	</View>

      	<View style={teacherStyles.viewStyles}>
      	<Text style={textStyles.titleSmall}>
      	Phone Number
      	</Text>
      	<Text style={textStyles.body}>
      	5109999999
      	</Text>
      	</View>
      	</View>
      	</ScrollView>
    );
  }
}

export default TeacherProfileScreen;
