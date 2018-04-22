/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Button, TouchableOpacity, Text, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import SignUpScreen from '../screens/login/SignUpScreen';
import ViewCourseScreen from '../screens/courses/ViewCourseScreen';
import CoursesScreen from '../screens/courses/CoursesScreen';
import TeacherProfileScreen from '../screens/teachers/TeacherProfileScreen';
import TeacherProfileEditScreen from '../screens/teachers/TeacherProfileEditScreen';
import EditCourseScreen from '../screens/courses/EditCourseScreen';
import StudentProfileScreen from '../screens/students/StudentProfileScreen';
import SearchStudentScreen from '../screens/students/SearchStudentScreen';
import SearchStudentResultScreen from '../screens/students/SearchStudentResultScreen';
import StudentProfilePreviewScreen from '../screens/students/StudentProfilePreviewScreen';
import AttendanceScreen from '../screens/attendances/AttendanceScreen';
import RecentAttendancesScreen from '../screens/attendances/RecentAttendancesScreen';
import PastAttendancesScreen from '../screens/attendances/PastAttendancesScreen';
import AttendanceSummaryScreen from '../screens/attendances/AttendanceSummaryScreen';
import StudentPersonalDetailsScreen from '../screens/students/StudentPersonalDetailsScreen';
import StudentExtraInfoScreen from '../screens/students/StudentExtraInfoScreen';
import StudentContactInfoScreen from '../screens/students/StudentContactInfoScreen';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../styles/colors';

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
      // headerTitle: 'View Course',
    },
  },
  Courses : {
    screen: CoursesScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Courses',
      headerLeft: (
          <TouchableOpacity onPress={() => { navigation.navigate('TeacherProfile') }}>
            <View style={{marginLeft: 8}}><FontAwesome 
            name="user-circle-o" size={32} color={colors.iconDark} /></View>
          </TouchableOpacity>
        ),
      headerStyle: {},
      headerTintColor: '',
    }),
  },
  TeacherProfile : {
    screen: TeacherProfileScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Profile',
      headerRight: (<TouchableOpacity title='Edit' 
        onPress={() => { navigation.navigate('EditTeacherProfile') }}>
          <View style={{marginRight: 8}}><MaterialCommunityIcons name="pencil" size={30} color={'#fff'} /></View>
        </TouchableOpacity>),
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
      headerStyle: {
        backgroundColor: '#f5f5f6',
        borderBottomColor: 'transparent',
      },
      headerTintColor: colors.textDark,
    },
  },
  AttendanceSummary: {
    screen: AttendanceSummaryScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Attendance Summary',
      headerStyle: {
        backgroundColor: '#f5f5f6',
        borderBottomColor: 'transparent',
      },
      headerTintColor: colors.textDark,
    }),
  },
  RecentAttendances: {
    screen: RecentAttendancesScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Recent Attendances',
    }),
  },
  PastAttendances: {
    screen: PastAttendancesScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Past Attendances',
    }),
  },
  SearchStudent: {
    screen: SearchStudentScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Search Student',
      headerStyle: {
          backgroundColor: colors.primaryYellow,
          borderBottomColor: 'transparent',
        }, 
      headerTintColor: colors.textLight, 
    }),
  },
  SearchStudentResults: {
    screen: SearchStudentResultScreen,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Search Student',
    }),
  },
  StudentProfilePreview : {
    screen: StudentProfilePreviewScreen,
    navigationOptions: {
      headerTitle: 'Student Profile Preview',
    },
  },
  StudentPersonalDetails : {
    screen: StudentPersonalDetailsScreen,
    navigationOptions: {
      headerTitle: 'Personal Details',
    },
  },
  StudentContactInfo : {
    screen: StudentContactInfoScreen,
    navigationOptions: {
      headerTitle: 'Contact Information',
    },
  },
  StudentExtraInfo : {
    screen: StudentExtraInfoScreen,
    navigationOptions: {
      headerTitle: 'Extra Information',
    },
  }
},
// Default navigation bar styling
{
  navigationOptions: {
    headerStyle: {
        backgroundColor: colors.primaryYellow,
        borderBottomColor: 'transparent',
      }, 
    headerTintColor: colors.textLight, 
  }
}
);


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
  static getStudentsPath()            { return APIRoutes.createRoute(`students`) }
  static getStudentPath(id)           { return APIRoutes.createRoute(`students/${id}`)}
  static searchStudentPath()          { return APIRoutes.createRoute('students/search') }

  // Attendances
  static attendanceItemPath()         { return APIRoutes.createRoute(`attendances/attendance_item`) }
  static getRecentAttendancesPath(courseId)   { return APIRoutes.createRoute(`courses/${courseId}/attendances`) }
  static getMonthAttendancesPath(courseId) { return APIRoutes.createRoute(`courses/${courseId}/monthAttendances`)}
  static attendancePath(id)           { return APIRoutes.createRoute(`attendances/${id}`) }

  // Login
  static signupPath()                 { return `/sign_up` }
  static loginPath()                  { return APIRoutes.deviseRoute(`sign_in`) }

  // Students enrolled in a particular course
  static getStudentsInCoursePath(id) { return APIRoutes.createRoute(`courses/${id}/students`) }

  // Enrollment
  static getCoursesStudentsPath()    { return APIRoutes.createRoute(`courses_students`) }
  static getCoursesStudentPath(id)    { return APIRoutes.createRoute(`courses_students/${id}`)}
}
