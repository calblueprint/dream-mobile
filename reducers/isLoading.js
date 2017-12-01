import types from '../lib/actionTypes'

export const isLoading = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_COURSES:
    case types.REQUEST_TEACHER:
    case types.REQUEST_STUDENTS:
    case types.REQUEST_ATTENDANCES:
    case types.REQUEST_UPDATE_ATTENDANCES:
      return { value: true }
    case types.RECEIVE_TEACHER_SUCCESS:
    case types.RECEIVE_COURSES_SUCCESS:
    case types.RECEIVE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_ERROR:
    case types.RECEIVE_STANDARD_ERROR:
      return { value: false }
    default:
      return state
  }
}

