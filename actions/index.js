// Courses
import types from '../lib/actionTypes'

let actions = {
  requestCourses: () => {
    return {
      type: types.REQUEST_COURSES,
    }
  },
  receiveCoursesSuccess: (courses) => {
    return {
      type: types.RECEIVE_COURSES_SUCCESS,
      courses
    }
  },
  receiveCoursesError: (error) => {
    return {
      type: types.RECEIVE_COURSES_ERROR,
      error
    }
  },
};

export default actions;
