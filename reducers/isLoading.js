import types from '../lib/actionTypes'

export const isLoading = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_COURSES:
      return true
    case types.RECEIVE_COURSES_SUCCESS:
    case types.RECEIVE_COURSES_ERROR:
      return false
    default:
      return state
  }
}

