import moment from 'moment';

export function attendanceDate(date) {
  return moment(date).format('YYYY-MM-DD');
}
