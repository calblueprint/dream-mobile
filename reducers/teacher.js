import types from '../lib/actionTypes'

export const teacher = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_TEACHER_SUCCESS:
      return action.teacher
    case types.LOGOUT:
      return {}
    default:
      return state
  }
}

