import types from '../lib/actionTypes';

// TODO (Kelsey): what should isSynced initially be for a list of attendances?
/**
  * Handles state for attendances for a given course. Object with date
  * as keys and value contains a list of attendances and bool to indicate
  * whether the list is synced with the database.
  *
  * eg: {
  *   '11/30/2017' : { list: [...], isSynced: true },
  *   '12/01/2017' : { list: [...], isSynced: false }
  * }
  */
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

