// Courses
import types from '../lib/actionTypes'

let actions = {
  // GENERAL
  updateLocale: (locale) => {
    return {
      type: types.UPDATE_LOCALE,
      locale
    }
  },
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
  updateStudentAttendanceStats: (attendances, curAttendances, courseId) => {
    return {
      type: types.UPDATE_STUDENT_ATTENDANCE_STATS,
      attendances,
      curAttendances,
      courseId
    }
  },

  // Sessions
  requestSessions: (courseId) => {
    return {
      type: types.REQUEST_SESSIONS,
      courseId
    }
  },
  receiveSessionsSuccess: (sessions, courseId) => {
    return {
      type: types.RECEIVE_SESSIONS_SUCCESS,
      sessions,
      courseId
    }
  },

  // Course Teachers
  requestCourseTeachers: (courseId) => {
    return {
      type: types.REQUEST_COURSE_TEACHERS,
      courseId
    }
  },
  receiveCourseTeachersSuccess: (courseTeachers, courseId) => {
    return {
      type: types.RECEIVE_COURSE_TEACHERS_SUCCESS,
      courseTeachers,
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
  receiveCourseAttendancesSuccess: (attendances, courseId) => {
    return {
      type: types.RECEIVE_COURSE_ATTENDANCES_SUCCESS,
      attendances,
      courseId
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
  saveLocalChanges: (attendances, courseId, date) => {
    return {
      type: types.SAVE_LOCAL_CHANGES,
      attendances,
      courseId,
      date
    }
  },
  clearLocalChanges: (dates) => {
    return {
      type: types.CLEAR_LOCAL_CHANGES,
      dates,
    }
  }
};

export default actions;
