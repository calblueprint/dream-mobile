import moment from 'moment';

const attendanceDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
}

const monthYearDate = (date) => {
  return moment(date).format('MMMM YYYY');
}

export { attendanceDate, monthYearDate }
