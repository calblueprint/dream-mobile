import types from '../lib/actionTypes'

export const localChanges = (state = { attendances: [] }, action) => {
  switch (action.type) {
    case types.SAVE_LOCAL_CHANGES:
      let newAttendance = {
        attendances: action.attendances,
        courseId: action.courseId,
        date: action.date,
      }
      return Object.assign({}, state, {
        attendances: [ ...state.attendances, newAttendance ]
      });
    case types.CLEAR_LOCAL_CHANGES:
      // Remove all attendances with dates corresponding to the passed in array
      return {attendances: state.attendances.filter((a) => { return !action.dates.includes(a.date) })};
    default:
      return state
  }
}
