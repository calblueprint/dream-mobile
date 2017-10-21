/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CoursesScreen from '../screens/courses/CoursesScreen';


export const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Courses : {
    screen: CoursesScreen,
    navigationOptions: {
      headerTitle: 'Courses',
    },
  },
});
