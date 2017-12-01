import moment from 'moment';

export function attendanceDate(date) {
  return moment(date).format('ddd, MMM D YYYY');
}
