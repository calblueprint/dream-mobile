import { combineReducers } from 'redux';
import { courses } from './courses';
import { isLoading } from './isLoading';

const rootReducer = combineReducers({
  courses,
  isLoading
});

export default rootReducer;
