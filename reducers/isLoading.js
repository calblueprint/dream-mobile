import types from '../lib/actionTypes'

export const isLoading = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_COURSES:
    case types.REQUEST_TEACHER:
      return { value: true }
    case types.RECEIVE_COURSES_SUCCESS:
    case types.RECEIVE_STANDARD_ERROR:
      return { value: false }
    default:
      return state
  }
}

