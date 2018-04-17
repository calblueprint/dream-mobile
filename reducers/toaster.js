import types from '../lib/actionTypes'

export const modal = (state = { message: null }, action) => {
  switch (action.type) {
    case types.UPDATE_TOASTER_MESSAGE:
      return { message: action.message };
    default:
      return state
  }
};

