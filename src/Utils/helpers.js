export function FormatDate(datesString, multiple) {
  const monthStr = {
    0 : "januari",
    1 : "februari",
    2 : "mars",
    3 : "april",
    4 : "maj",
    5 : "juni",
    6 : "juli",
    7 : "augusti",
    8 : "september",
    9 : "oktober",
    10 : "november",
    11 : "december"
  };

  // Fetching all dates from Drupal but we just set next as date.
  const dates = datesString.split(', ');
  let day = null;
  let formatted = null;
  for (let d of dates) {
    const date = new Date();
    const unixNow = Math.round(+date.setHours(0, 0, 0, 0) / 1000);

    if (d < unixNow)
      continue;
    const dateStamp = parseInt(d) * 1000;
    // if (isAndroid) {
    //   date_stamp = date_stamp + (1000 * 60 * 60 * 4);
    // }
    const dateObj = new Date(dateStamp);
    let day = null;
    if (multiple) {
      day = multiple;
    } else {
      day = dateObj.getDate();
    }
    const month = monthStr[dateObj.getMonth()];
    formatted = day + ' ' + month;
    break;
  }
  return formatted;
}
