/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CoursesScreen from '../screens/courses/CoursesScreen';
import CreateCourseScreen from '../screens/courses/CreateCourseScreen';
import StudentsScreen from '../screens/students/StudentsScreen';
import CreateStudentScreen from '../screens/students/CreateStudentScreen';
import StudentProfileScreen from '../screens/students/StudentProfileScreen';
import StudentProfileEditScreen from '../screens/students/StudentProfileEditScreen';
import AttendanceSheetScreen from '../screens/attendances/AttendanceSheetScreen';

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
  CreateStudent : {
    screen: CreateStudentScreen,
    navigationOptions: {
      headerTitle: 'CreateStudent',
    },
  },
  StudentProfile : {
    screen: StudentProfileScreen,
    navigationOptions: {
      headerTitle: 'StudentProfile',
    },
  },
  EditStudentProfile : {
    screen: StudentProfileEditScreen,
    navigationOptions: {
      headerTitle: 'Edit Profile',
    },
  },
  Attendances: {
    screen: AttendanceSheetScreen,
    navigationOptions: {
      headerTitle: 'Attendance',
    },
  }
});


export class APIRoutes {
  static createRoute(route)           { return `/api/${route}` }

  // Courses
  static getCoursesPath()             { return APIRoutes.createRoute(`courses`) }

  // Students
  static getStudentsPath(courseId)          { return APIRoutes.createRoute(`courses/${courseId}/students`) }
  static getStudentPath(studentId)          { return APIRoutes.createRoute(`students/${studentId}`)}

  // Attendances
  static attendanceItemPath()         { return APIRoutes.createRoute(`attendances/attendance_item`) }
  static attendancePath(id)           { return APIRoutes.createRoute(`attendances/${id}`) }
}
