/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CoursesScreen from '../screens/courses/CoursesScreen';
import CreateCourseScreen from '../screens/courses/CreateCourseScreen';
import StudentsScreen from '../screens/students/StudentsScreen';
import AttendanceScreen from '../screens/attendances/AttendanceScreen';

/**
 * HomeStack is the main navigation stack starting from the HomeScreen
 */
export const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Courses: {
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
  Students : {
    screen: StudentsScreen,
    navigationOptions: {
      headerTitle: 'Students',
    },
  },
  Attendances: {
    screen: AttendanceScreen,
    navigationOptions: {
      headerTitle: 'Attendance',
    },
  }
});


/**
 * Class for defining API routes
 */
export class APIRoutes {
  // Use to build api routes
  static createRoute(route)           { return `/api/${route}` }

  // Courses
  static getCoursesPath()             { return APIRoutes.createRoute(`courses`) }

  // Students
  static getStudentsPath(id)          { return APIRoutes.createRoute(`courses/${id}/students`) }

  // Attendances
  static attendanceItemPath()         { return APIRoutes.createRoute(`attendances/attendance_item`) }
  static attendancePath(id)           { return APIRoutes.createRoute(`attendances/${id}`) }
}
