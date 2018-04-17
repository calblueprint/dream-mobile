import types from '../lib/actionTypes';

/**
  * Handles state for students
  *
  * eg: [
  *   { student1 },
  *   { student2 },
  *   { student3 }
  * ]
  */

const updateAttendanceStats = (attendanceStats, attendance_type, modifier) => {
  switch(attendance_type) {
    case 0:
      attendanceStats.num_present += modifier;
      break;
    case 1:
    case 2:
      attendanceStats.num_absent += modifier;
      break;
    case 3:
    case 4:
      attendanceStats.num_late += modifier;
      break;
  }
  return attendanceStats
};

export const students = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_STUDENTS_SUCCESS:
      return action.students;
    case types.UPDATE_STUDENT_ATTENDANCE_STATS:
      return state.map(s => {
        relevantAttendance = action.attendances.find((a) => a.student_id === s.id);
        relevantOldAttendance = action.curAttendances.find((a) => a.student_id === s.id);
        var updatedStats = {...s.attendance_stats};
        if(relevantOldAttendance) {
          updateAttendanceStats(updatedStats, relevantOldAttendance.attendance_type, -1);
        }
        updateAttendanceStats(updatedStats, relevantAttendance.attendance_type, 1);
        return { ...s, attendance_stats: updatedStats};
      });
    default:
      return state
  }
}
