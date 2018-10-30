import types from '../lib/actionTypes'

export const config = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_COURSES:
    case types.REQUEST_TEACHER:
    case types.REQUEST_STUDENTS:
    case types.REQUEST_SESSIONS:
    case types.REQUEST_COURSE_TEACHERS:
    case types.REQUEST_ATTENDANCES:
    case types.REQUEST_COURSE_ATTENDANCES:
    case types.REQUEST_UPDATE_ATTENDANCES:
      return Object.assign({}, state, { isLoading: true });
    case types.RECEIVE_TEACHER_SUCCESS:
    case types.RECEIVE_COURSES_SUCCESS:
    case types.RECEIVE_COURSE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_STUDENTS_SUCCESS:
    case types.RECEIVE_SESSIONS_SUCCESS:
    case types.RECEIVE_COURSE_TEACHERS_SUCCESS:
    case types.RECEIVE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_ERROR:
    case types.RECEIVE_STANDARD_ERROR:
      return Object.assign({}, state, { isLoading: false });
    case types.UPDATE_LOCALE:
      return Object.assign({}, state, { locale: action.locale});
    default:
      return state
  }
}
