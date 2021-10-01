export default {

  formatDate: (date, monthFirst=false) => {
    const min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    const h = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    const m = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const d = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    
    const fixedTerms = "/" + date.getFullYear() + "  " + h + ":" + min;

    return  monthFirst 
            ? (m) + "/" + (d) + fixedTerms
            : (d) + "/" + (m) + fixedTerms;
  }
}
