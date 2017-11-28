// Courses
import types from '../lib/actionTypes'

let actions = {
  receiveStandardError: (error) => {
    return {
      type: types.RECEIVE_STANDARD_ERROR,
      error
    }
  },
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
  requestTeacher: () => {
    return {
      type: types.REQUEST_TEACHER,
    }
  },
  receiveTeacherSuccess: (teacher) => {
    return {
      type: types.RECEIVE_TEACHER_SUCCESS,
      teacher
    }
  },
};

export default actions;
