import types from '../lib/actionTypes';
import { students } from './students';
import { attendances } from './attendances';


/**
  * Handles all courses state
  *
  * eg: [
  *   { course1 },
  *   { course2 },
  *   { course3 }
  * ]
  *
  */
export const courses = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_COURSES_SUCCESS:
      return action.courses
    case types.RECEIVE_STUDENTS_SUCCESS:
    case types.RECEIVE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_ERROR:
      // For specific course
      return state.map((item) => {
        return item.id == action.courseId ? course(item, action) : item;
      });
    default:
      return state;
  }
}


// Merges old courses and new courses. 
const checkUnsyncedAttendances = (oldCourses, newCourses) => {
  var courseUpdates = {};
  for(let courseId in oldCourses) {
    let course = oldCourses[courseId]
    var attendancesToBeSynced = {};
    var numUpdatedAttendances = 0;
    if('attendances' in course) {
      for(let dateName in course.attendances) {
        const curAttendance = course.attendances[dateName];
        if(('isSynced' in curAttendance) && curAttendance.isSynced == false) {
          console.log("This attendance is not synced");
          attendancesToBeSynced[dateName] = curAttendance;
          numUpdatedAttendances += 1;
        } else {
          console.log("This attendance is synced");
        }
      }
    }
    if(numUpdatedAttendances > 0) {
      courseUpdates[course.id] = attendancesToBeSynced;
    }
  }

  for(let courseId in newCourses) {
    let course = newCourses[courseId];
    if(course.id in courseUpdates) {
      course["attendances"] = courseUpdates[course.id];
    }
  }
  return newCourses;
}

/**
  * Handles state for a specific course
  *
  * eg: {
  *   id: 1,
  *   ...,
  *   students: [ ... ],
  *   attendances: { ... }
  * }
  */
const course = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_STUDENTS_SUCCESS:
      // For course's students
      return Object.assign({}, state, {
        students: students(state.students, action)
      });
    case types.RECEIVE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_SUCCESS:
    case types.RECEIVE_UPDATE_ATTENDANCES_ERROR:
      // For course's attendances
      return Object.assign({}, state, {
        attendances: attendances(state.attendances, action)
      });
    default:
      return state;
  }
}
