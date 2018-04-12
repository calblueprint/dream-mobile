import types from '../lib/actionTypes';

/**
  * Handles state for course_teachers
  *
  * eg: [
  *   { course_teacher1 },
  *   { course_teacher2 },
  *   { course_teacher3 }
  * ]
  */
export const course_teachers = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_COURSE_TEACHERS_SUCCESS:
      return action.courseTeachers;
    default:
      return state
  }
}
