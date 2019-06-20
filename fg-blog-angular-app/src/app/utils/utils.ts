
function dhm(ms: number) {
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

export function calTimeDifference(updateTime) {
     updateTime = new Date(updateTime);
     const d = new Date();
     console.log(d, typeof(d));
     // parse both time stamps into dates
     const finalCurrentTime = Date.parse(ISODateString(d));
     const finalPostDateTime = Date.parse(ISODateString(updateTime));

     // find the difference between the original post date/time and the current date/time (in milliseconds)
     const responseTimeFinal = Math.abs(finalCurrentTime - finalPostDateTime);

     // pass the milliseconds from responseTimeFinal into the dhm function to convert it back to a date
     const timeDifference = dhm(responseTimeFinal);

     return timeDifference;  // final result
}
