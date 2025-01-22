export const exceltoJsdate = (date, setIsValidExcel) => {
  console.log("date:", date, typeof date);
  if (typeof date === 'string' && /^\d+$/.test(date)) {
    return ''
  }
  let Numbers = String(date).replace(/[-/]/g, '');
  if (!/^\d+$/.test(Numbers)) {
    console.log("date2:", date, typeof date);
    return ''
  }
  if (typeof date !== 'number' || isNaN(date)) {
    if (typeof date === 'string' && !isNaN(Date.parse(date))) {
      let parsedDate = new Date(date);
      let day = parsedDate.getDate();
      let month = parsedDate.getMonth() + 1;
      let year = parsedDate.getFullYear();
      if (month < 10) month = '0' + month;
      if (day < 10) day = '0' + day;
      
      return `${month}-${day}-${year}`;
    } else {
      console.error('Invalid date input');
      return '';
    }
  }
  
  let converted_date = new Date(Math.round((date - 25569) * 864e5));
  converted_date = String(converted_date).slice(4, 15);
  let dateParts = converted_date.split(" ");
  let day = dateParts[1];
  let month = dateParts[0];
  month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1;
  
  if (month.toString().length <= 1) month = '0' + month;
  let year = dateParts[2];

  return `${month}-${day}-${year.slice(0, 4)}`;
}
