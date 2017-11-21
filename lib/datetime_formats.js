/* Display time in HH:MM AM/PM format. */
export function timeFormat(date, mode) {
  if(!date) return "";
  let value=date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  return value;
}

/* Display datetime in date format, i.e. Mon Nov 20 2017 */
export function dateFormat(date, mode) {
  if(!date) return "";
  let value=date.toDateString();
  return value;
}
