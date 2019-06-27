const CHAR_PER_MINUTE = 400;

function formatInDays(ms: number) {
     let days2: any = Math.floor(ms / (24 * 60 * 60 * 1000));
     const daysms: any = ms % (24 * 60 * 60 * 1000);
     let hours2: any = Math.floor((daysms) / (60 * 60 * 1000));
     const hoursms: any = ms % (60 * 60 * 1000);
     let minutes2: any = Math.floor((hoursms) / (60 * 1000));
     const minutesms: any = ms % (60 * 1000);
     let sec: any = Math.floor((minutesms) / (1000));

     days2 = (days2 < 10) ? "0" + days2 : days2;
     hours2 = (hours2 < 10) ? "0" + hours2 : hours2;
     minutes2 = (minutes2 < 10) ? "0" + minutes2 : minutes2;
     sec = (sec < 10) ? "0" + sec : sec;

     // tslint:disable:triple-equals
     if (days2 == "00" && hours2 == "00" && minutes2 == "00" && sec != "00") {
          if (sec < "30") {
               return "less then a minute";
          } else {
               return "about a minute";
          }
     }

     if (days2 == "00" && hours2 == "00" && minutes2 != "00") {
          if (minutes2 == "01") {
               return "about a minute";
          } else {
               return "about " + minutes2 + " minutes";
          }
     }

     if (days2 == "00" && hours2 != "00") {
          if (hours2 == "01") {
               return "about an hour";
          } else {
               return "about " + hours2 + " hours";
          }
     }

     if (days2 != "00") {
          if (days2 == "01") {
               return "about a day";
          } else {
               return "about " + days2 + " days";
          }
     }

     return days2 + "" + hours2 + "" + minutes2 + "" + sec;
}

function pad(n: any) {return n < 10 ? '0' + n : n; }

// current time in RFC 3339 timestamp
function ISODateString(d) {
     d = new Date(d);
     return d.getFullYear() + '-'
         + pad(d.getUTCMonth() + 1) + '-'
         + pad(d.getUTCDate()) + 'T'
         + pad(d.getUTCHours()) + ':'
         + pad(d.getUTCMinutes()) + ':'
         + pad(d.getUTCSeconds()) + 'Z';
}

function formatWeekDate(d) {
     // tslint:disable:variable-name
     d = new Date(d);
     // determine days
     const d_names = new Array("Sunday", "Monday", "Tuesday",
     "Wednesday", "Thursday", "Friday", "Saturday");

     const curr_day = d.getDay();
     // determine the time hours
     let a_p = "";
     let curr_hour = d.getUTCHours();
     if (curr_hour < 12) {
     a_p = "AM";
     } else {
     a_p = "PM";
     }
     if (curr_hour == 0) {
          curr_hour = 12;
     }
     if (curr_hour > 12) {
          curr_hour = curr_hour - 12;
     }
     curr_hour = (curr_hour < 10) ? "0" + curr_hour : curr_hour;

     let curr_minute = d.getUTCMinutes();
     curr_minute = (curr_minute < 10) ? "0" + curr_minute : curr_minute;

     return d_names[curr_day] + ", " + curr_hour + ":" + curr_minute + " " + a_p;
}

function formatMediumDate(d) {
     d = new Date(d);
     // tslint:disable:variable-name
     const m_names = new Array("January", "February", "March",
     "April", "May", "June", "July", "August", "September",
     "October", "November", "December");

     const curr_date = d.getDate();
     let sup = "";
     if (curr_date == 1 || curr_date == 21 || curr_date == 31) {
     sup = "st";
     } else if (curr_date == 2 || curr_date == 22) {
     sup = "nd";
     } else if (curr_date == 3 || curr_date == 23) {
     sup = "rd";
     } else {
     sup = "th";
     }
     const curr_month = d.getMonth();

     // determine the time hours
     let a_p = "";
     let curr_hour = d.getUTCHours();
     if (curr_hour < 12) {
     a_p = "AM";
     } else {
     a_p = "PM";
     }
     if (curr_hour == 0) {
          curr_hour = 12;
     }
     if (curr_hour > 12) {
          curr_hour = curr_hour - 12;
     }
     curr_hour = (curr_hour < 10) ? "0" + curr_hour : curr_hour;

     let curr_minute = d.getUTCMinutes();
     curr_minute = (curr_minute < 10) ? "0" + curr_minute : curr_minute;
     return m_names[curr_month] + " " + curr_date + sup + ", " + curr_hour + ":" + curr_minute + " " + a_p;
}

function formatFarDate(d) {
     // tslint:disable:variable-name
     const m_names = new Array("January", "February", "March",
     "April", "May", "June", "July", "August", "September",
     "October", "November", "December");

     d = new Date(d);
     const curr_date = d.getDate();
     let sup = "";
     if (curr_date == 1 || curr_date == 21 || curr_date == 31) {
     sup = "st";
     } else if (curr_date == 2 || curr_date == 22) {
     sup = "nd";
     } else if (curr_date == 3 || curr_date == 23) {
     sup = "rd";
     } else {
     sup = "th";
     }
     const curr_month = d.getMonth();
     const curr_year = d.getFullYear();

     return m_names[curr_month] + " " + curr_date + sup + ", " + curr_year;
}

export function calTimeDifference(updateTime) {
     updateTime = new Date(updateTime);
     const d = new Date();
     console.log(d, typeof(d));
     // parse both time stamps into dates
     const finalCurrentTime = Date.parse(ISODateString(d));
     const finalPostDateTime = Date.parse(ISODateString(updateTime));

     // find the difference between the original post date/time and the current date/time (in milliseconds)
     const responseTimeFinal = Math.abs(finalCurrentTime - finalPostDateTime);
     const days: any = Math.floor(responseTimeFinal / (24 * 60 * 60 * 1000));
     let timeDifference: any;
     if (days >= 1) {
          if (updateTime.getFullYear() == d.getFullYear()) {
               if (updateTime.getMonth() == d.getMonth() && Math.abs(updateTime.getDate() - d.getDate()) < 7 ) {
                    timeDifference = formatWeekDate(updateTime);
               } else {
                    timeDifference = formatMediumDate(updateTime);
               }
          } else {
               timeDifference = formatFarDate(updateTime);
          }
     } else {
          // pass the milliseconds from responseTimeFinal into the dhm function to convert it back to a date
          timeDifference = formatInDays(responseTimeFinal);
     }
     return timeDifference;  // final result
}

export function calReadTime(document) {
     const documentWithoutSpace = document.replace(/\s/g, '');
     const documentLen = documentWithoutSpace.length;
     const readTime = Math.round(documentLen / CHAR_PER_MINUTE);
     return readTime;
}
