import moment from 'moment';

const attendanceDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
}

const monthDayYearDate = (date) => {
  return moment(date).format('D MMM, YYYY')
}

const monthYearDate = (date) => {
  return moment(date).format('MMMM YYYY');
}

export { attendanceDate, monthYearDate }
