import types from '../lib/actionTypes';

export const students = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_STUDENTS_SUCCESS:
      return action.students;
    default:
      return state
  }
}

