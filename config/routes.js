/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import SignUpScreen from '../screens/login/SignUpScreen';
import ViewCourseScreen from '../screens/courses/ViewCourseScreen';
import CoursesScreen from '../screens/courses/CoursesScreen';
import TeacherProfileScreen from '../screens/teachers/TeacherProfileScreen';
import TeacherProfileEditScreen from '../screens/teachers/TeacherProfileEditScreen';
import EditCourseScreen from '../screens/courses/EditCourseScreen';
import CreateStudentScreen from '../screens/students/CreateStudentScreen';
import StudentProfileScreen from '../screens/students/StudentProfileScreen';
import AttendanceScreen from '../screens/attendances/AttendanceScreen';
import AttendanceSummaryScreen from '../screens/attendances/AttendanceSummaryScreen';

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
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Login',
      headerLeft: null,
      gesturesEnabled: false,
    },
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      headerTitle: 'Sign Up'
    },
  },
  ViewCourse: {
    screen: ViewCourseScreen,
    navigationOptions: {
      headerTitle: 'View Course',
    },
  },
  Courses : {
    screen: CoursesScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Courses',
      headerLeft: (<Button title='Profile' onPress={() => { navigation.navigate('TeacherProfile') }}/>),
    }),
  },
  TeacherProfile : {
    screen: TeacherProfileScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Profile',
      headerRight: (<Button title='Edit' onPress={() => { navigation.navigate('EditTeacherProfile') }}/>),
    }),
  },
  EditTeacherProfile : {
    screen: TeacherProfileEditScreen,
    navigationOptions: {
      headerTitle: 'Edit Profile',
    },
  },
  EditCourse : {
    screen: EditCourseScreen,
    navigationOptions: {
      headerTitle: 'Edit Course',
    },
  },
  CreateStudent : {
    screen: CreateStudentScreen,
    navigationOptions: {
      headerTitle: 'Enroll Student',
    },
  },
  StudentProfile : {
    screen: StudentProfileScreen,
    navigationOptions: {
      headerTitle: 'Student Profile',
    },
  },
  Attendances: {
    screen: AttendanceScreen,
    navigationOptions: {
      headerTitle: 'Attendance',
    },
  },
  AttendanceSummary: {
    screen: AttendanceSummaryScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Attendance Summary',
      headerRight: (<Button title='Edit' onPress={() => { navigation.goBack() }}/>),
    }),
  },
});


/**
 * Class for defining API routes
 */
export class APIRoutes {
  // Use to build api routes
  static createRoute(route)           { return `/api/${route}` }
  static deviseRoute(route)           { return `/teachers/${route}` }

  // Courses
  static getCoursesPath()             { return APIRoutes.createRoute(`courses`) }
  static getCoursePath(id)            { return APIRoutes.createRoute(`courses/${id}`) }
  static getSessionsPath(id)          { return APIRoutes.createRoute(`courses/${id}/sessions`) }
  static getTeachersPath(id)          { return APIRoutes.createRoute(`courses/${id}/teachers`) }

  //Teachers
  static getTeacherPath(id)           { return APIRoutes.createRoute(`teachers/${id}`) }
  static getTeacherCoursesPath(id)    { return APIRoutes.createRoute(`teachers/${id}/courses`) }

  // Students
  static getStudentsPath(courseId)    { return APIRoutes.createRoute(`courses/${courseId}/students`) }
  static getStudentPath(studentId)    { return APIRoutes.createRoute(`students/${studentId}`)}

  // Attendances
  static attendanceItemPath()         { return APIRoutes.createRoute(`attendances/attendance_item`) }
  static attendancePath(id)           { return APIRoutes.createRoute(`attendances/${id}`) }

  // Login
  static signupPath()                 { return `/sign_up` }
  static loginPath()                  { return APIRoutes.deviseRoute(`sign_in`) }

}
