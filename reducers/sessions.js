import types from '../lib/actionTypes';

/**
  * Handles state for sessions
  *
  * eg: [
  *   { session1 },
  *   { session2 },
  *   { session3 }
  * ]
  */
export const sessions = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_SESSIONS_SUCCESS:
      return action.sessions;
    default:
      return state
  }
}
