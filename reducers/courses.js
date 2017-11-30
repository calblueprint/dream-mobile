import types from '../lib/actionTypes'

export const courses = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_COURSES_SUCCESS:
      return action.courses
    default:
      return state
  }
}

