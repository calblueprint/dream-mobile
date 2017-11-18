import types from '../lib/actionTypes'

export const courses = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_COURSES:
      return Object.assign({}, state, {
        text: state.text == 'on' ? 'off' : 'on'
      })
    default:
      return state
  }
}

