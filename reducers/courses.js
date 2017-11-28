import types from '../lib/actionTypes'

export const courses = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_COURSES_SUCCESS:
      return action.courses
    // TODO (Kelsey): have error response
    case types.RECEIVE_COURSES_ERROR:
      return []
    default:
      return state
  }
}

