/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CoursesScreen from '../screens/courses/CoursesScreen';
// TODO (caseytaka): put create course screen in screens dir
import CreateCourseScreen from './courses/create_course'


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
  CreateCourse : {
    screen: CreateCourseScreen,
    navigationOptions: {
      headerTitle: 'CreateCourse',
    },
  },
});


export class APIRoutes {
  static createRoute(route)           { return `/api/${route}` }

  static getCoursesPath()             { return APIRoutes.createRoute(`courses`) }
  // Example route w/ id
  // static createComponentPath(id)    { return APIRoutes.createRoute(`admins/subsections/${id}/components`) }
}
