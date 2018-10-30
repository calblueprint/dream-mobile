import { courses } from './courses';
import { config } from './config';
import { teacher } from './teacher';
import { modal } from './modal';
import { localChanges } from './localChanges';

const reducers = {
  teacher,
  courses,
  localChanges,
  config,
  modal
};

export default reducers;
