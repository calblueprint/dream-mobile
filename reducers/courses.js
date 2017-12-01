import types from '../lib/actionTypes'
import { students } from './students';
import { attendances } from './attendances';

export const courses = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_COURSES_SUCCESS:
      return action.courses;
    case types.RECEIVE_STUDENTS_SUCCESS:
    case types.RECEIVE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_ERROR:
      return state.map((item) => {
        return item.id == action.courseId ? course(item, action) : item;
      });
    default:
      return state;
  }
}

const course = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_STUDENTS_SUCCESS:
      return Object.assign({}, state, {
        students: students(state.students, action)
      });
    case types.RECEIVE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_ERROR:
      return Object.assign({}, state, {
        attendances: attendances(state.attendances, action)
      });
    default:
      return state;
  }
}

