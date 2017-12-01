import types from '../lib/actionTypes';

export const attendances = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_ATTENDANCES_SUCCESS:
      return Object.assign({}, state, {
        [action.date]: action.attendances
      })
    default:
      return state;
  }
}

