import types from '../lib/actionTypes'
import { students } from './students';
import { attendances } from './attendances';

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
      return action.courses;
    case types.RECEIVE_STUDENTS_SUCCESS:
    case types.RECEIVE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_COURSE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_ERROR:
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
      // For course's students
      return Object.assign({}, state, {
        students: students(state.students, action)
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
