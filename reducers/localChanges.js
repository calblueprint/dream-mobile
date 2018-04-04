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
        attendances: [ ...attendances, newAttendance ]
      });
    default:
      return state
  }
}
