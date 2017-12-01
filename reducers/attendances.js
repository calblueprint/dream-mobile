import types from '../lib/actionTypes';

// TODO (Kelsey): what should isSynced initially be for a list of attendances?
export const attendances = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_ATTENDANCES_SUCCESS:
      return Object.assign({}, state, {
        [action.date]: Object.assign({}, state[action.date], {
          list: action.attendances
      })});
    case types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS:
      return Object.assign({}, state, {
        [action.date]: Object.assign({}, state[action.date], {
          list: action.attendances,
          isSynced: true,
      })});
    case types.RECEIVE_UPDATE_ATTENDANCES_ERROR:
      return Object.assign({}, state, {
        [action.date]: Object.assign({}, state[action.date], {
          list: action.attendances,
          isSynced: false,
      })});
    default:
      return state;
  }
}

