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
  receiveUnableToSyncError: (error) => {
    return {
      type: types.RECEIVE_UNABLE_TO_SYNC_ERROR,
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
  // TODO: dispatches to requestTeacher not handled anywhere?
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
  requestCourseAttendances: (courseId) => {
    return {
      type: types.REQUEST_COURSE_ATTENDANCES,
      courseId,
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
