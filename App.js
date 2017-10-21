import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeStack } from './config/routes'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>DREAM</Text>
        <Button
          onPress={() => navigate('Courses')}
          title="See Courses"
          />
        <Button
          onPress={() => navigate('Students')}
          title="See Students"
          />
      </View>
    );
  }
}

export const AppNavigator = StackNavigator({
  Home    : { screen: HomeScreen },
  Courses : { screen: CoursesScreen },
  Students : { screen: StudentsScreen },
});
>>>>>>> first commit

export default class App extends React.Component {
  render() {
    return <HomeStack />;
  }
}
