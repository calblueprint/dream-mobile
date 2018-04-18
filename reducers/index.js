import { courses } from './courses';
import { isLoading } from './isLoading';
import { teacher } from './teacher';
import { modal } from './modal';
import { localChanges } from './localChanges';

const reducers = {
  teacher,
  courses,
  isLoading,
  modal,
  localChanges
};

export default reducers;
