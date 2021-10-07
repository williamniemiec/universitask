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
    const minutes = _getNumberWithLeadingZero(date.getMinutes());
    const hours = _getNumberWithLeadingZero(date.getHours());
    const month = _getNumberWithLeadingZero(date.getMonth());
    const day = _getNumberWithLeadingZero(date.getDate());

    return  monthFirst 
            ? _generateFormatedDateWithMonthFirst(day, month, year, hours, minutes)
            : _generateFormatedDate(day, month, year, hours, minutes);
  },

  _getNumberWithLeadingZero: (number) => {
    if (number >= 10)
      return number;
    
    return '0' + number;
  },

  _generateFormatedDateWithMonthFirst: (day, month, year, hours, minutes) => {
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  },

  _generateFormatedDate: (day, month, year, hours, minutes) => {
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
