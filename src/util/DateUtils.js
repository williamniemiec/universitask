export default {

  /**
   * Formats a date in a friendly format.
   * 
   * @param   {Date} date Date to be formated
   * @param   {bool} monthFirst [default=false] Indicates if the month should come
   * before the day
   * 
   * @return  {string} Formated date
   */
  formatDate: (date, monthFirst=false) => {
    const year = date.getFullYear();
    const month = getNumberWithLeadingZero(date.getMonth());
    const day = getNumberWithLeadingZero(date.getDate());
    const hours = getNumberWithLeadingZero(date.getHours());
    const minutes = getNumberWithLeadingZero(date.getMinutes());

    return  monthFirst 
            ? generateFormatedDateWithMonthFirst(day, month, year, hours, minutes)
            : generateFormatedDate(day, month, year, hours, minutes);
  }
}

function getNumberWithLeadingZero(number) {
  if (number >= 10)
    return number;
  
  return '0' + number;
}

function generateFormatedDateWithMonthFirst(day, month, year, hours, minutes) {
  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

function generateFormatedDate(day, month, year, hours, minutes) {
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
