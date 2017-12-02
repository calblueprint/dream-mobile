import { courses } from './courses';
import { isLoading } from './isLoading';
import { teacher } from './teacher';
import { modal } from './modal';
import { reducer as network } from 'react-native-offline';

const reducers = {
  teacher,
  courses,
  isLoading,
  modal,
  network
};

export default reducers;
