import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { CoursesScreen } from './courses/courses_main'
import { StudentsScreen } from './students/students_main'

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

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
