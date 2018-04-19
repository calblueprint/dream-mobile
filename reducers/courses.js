import types from '../lib/actionTypes'
import { students } from './students';
import { sessions } from './sessions';
import { course_teachers } from './course_teachers';
import { attendances } from './attendances';
import { attendanceDate } from '../lib/date';

/**
  * Handles all courses state
  *
  * eg: [
  *   { course1 },
  *   { course2 },
  *   { course3 }
  * ]
  *
  */
export const courses = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_COURSES_SUCCESS:
      //TODO: Intelligently merge (if still relevant);
      date = attendanceDate(new Date());
      return action.courses.map((course) => (Object.assign({}, course, {last_synced: date})));
    case types.RECEIVE_STUDENTS_SUCCESS:
    case types.RECEIVE_SESSIONS_SUCCESS:
    case types.RECEIVE_COURSE_TEACHERS_SUCCESS:
    case types.RECEIVE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_COURSE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_ERROR:
    case types.UPDATE_STUDENT_ATTENDANCE_STATS:
      // For specific course
      return state.map((item) => {
        return item.id == action.courseId ? course(item, action) : item;
      });
    default:
      return state;
  }
}

/**
  * Handles state for a specific course
  *
  * eg: {
  *   id: 1,
  *   ...,
  *   students: [ ... ],
  *   attendances: { ... }
  * }
  */
const course = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_STUDENTS_SUCCESS:
    case types.UPDATE_STUDENT_ATTENDANCE_STATS:
      // For course's students
      return Object.assign({}, state, {
        students: students(state.students, action)
      });
    case types.RECEIVE_SESSIONS_SUCCESS:
      // For course's sessions
      return Object.assign({}, state, {
        sessions: sessions(state.sessions, action)
      });
    case types.RECEIVE_COURSE_TEACHERS_SUCCESS:
      // For course's courseTeachers
      return Object.assign({}, state, {
        teachers: course_teachers(state.teachers, action)
      });
    case types.RECEIVE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_COURSE_ATTENDANCES_SUCCESS:
      return Object.assign({}, state, {
        attendances: attendances(state.attendances, action)
      });
    case types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_ERROR:
      // For course's attendances
      return Object.assign({}, state, {
        synced: action.type == types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS,
        attendances: attendances(state.attendances, action)
      });
    default:
      return state;
  }
}
