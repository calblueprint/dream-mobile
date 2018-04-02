import { courses } from './courses';
import { isLoading } from './isLoading';
import { teacher } from './teacher';
import { modal } from './modal';
import { reduxTokenAuthReducer } from 'redux-token-auth'

const reducers = {
  teacher,
  courses,
  isLoading,
  modal, 
  reduxTokenAuthReducer
};

export default reducers;
