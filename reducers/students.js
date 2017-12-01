import types from '../lib/actionTypes';

/**
  * Handles state for students
  *
  * eg: [
  *   { student1 },
  *   { student2 },
  *   { student3 }
  * ]
  */
export const students = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_STUDENTS_SUCCESS:
      return action.students;
    default:
      return state
  }
}

