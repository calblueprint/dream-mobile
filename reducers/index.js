import { combineReducers } from 'redux';
import { courses } from './courses';
import { isLoading } from './isLoading';
import { teacher } from './teacher';

const rootReducer = combineReducers({
  teacher,
  courses,
  isLoading
});

export default rootReducer;
