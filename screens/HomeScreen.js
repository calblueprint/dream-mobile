import React from 'react';
import { Button, Text, View } from 'react-native';
import { commonStyles } from '../styles/styles';

class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={commonStyles.container}>
        <Text>DREAM</Text>
        <Button
          onPress={() => navigate('Courses')}
          title="See Courses"
        />
        <Button
          onPress={() => navigate('Students')}
          title="See Students"
        />
        <Button
          onPress={() => navigate('Login')}
          title="Login"
        />
      </View>
    );
  }
}

export default HomeScreen;
