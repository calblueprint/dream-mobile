// Courses
import types from '../lib/actionTypes'

let actions = {
  // GENERAL
  receiveStandardError: (error) => {
    return {
      type: types.RECEIVE_STANDARD_ERROR,
      error
    }
  },
  logout: () => {
    return {
      type: types.LOGOUT
    }
  },
  openModal: () => {
    return {
      type: types.OPEN_MODAL
    }
  },
  closeModal: () => {
    return {
      type: types.CLOSE_MODAL
    }
  },

  // COURSES
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

  // TEACHERS
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

  // STUDENTS
  requestStudents: (courseId) => {
    return {
      type: types.REQUEST_STUDENTS,
      courseId
    }
  },
  receiveStudentsSuccess: (students, courseId) => {
    return {
      type: types.RECEIVE_STUDENTS_SUCCESS,
      students,
      courseId
    }
  },

  // ATTENDANCES
  requestAttendances: (courseId, date) => {
    return {
      type: types.REQUEST_ATTENDANCES,
      courseId,
      date
    }
  },
  receiveAttendancesSuccess: (attendances, courseId, date) => {
    return {
      type: types.RECEIVE_ATTENDANCES_SUCCESS,
      attendances,
      courseId,
      date
    }
  },
  requestUpdateAttendances: (courseId, date) => {
    return {
      type: types.REQUEST_UPDATE_ATTENDANCES,
      courseId,
      date
    }
  },
  receiveUpdateAttendancesSuccess: (attendances, courseId, date) => {
    return {
      type: types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS,
      attendances,
      courseId,
      date
    }
  },
  receiveUpdateAttendancesError: (attendances, courseId, date) => {
    return {
      type: types.RECEIVE_UPDATE_ATTENDANCES_ERROR,
      attendances,
      courseId,
      date
    }
  },
};

export default actions;
