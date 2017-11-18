// Courses
import types from '../lib/actionTypes'

let actions = {
  requestCourses: (courseId) => {
    return {
      type: types.REQUEST_COURSES,
      courseId
    }
  },
};

export default actions;
