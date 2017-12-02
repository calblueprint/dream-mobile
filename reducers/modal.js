import types from '../lib/actionTypes'

export const modal = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return { isOpen: true }
    case types.CLOSE_MODAL:
      return { isOpen: false }
    default:
      return state
  }
}

