import moment from 'moment';

export function CalculateTime(date, isOnlyDMY) {
  if (isOnlyDMY) {
    let _date = moment(date);
    let _todaysDate = moment();
    if (
      _date.isSame(_todaysDate, 'day') ||
      _date.isSame(_todaysDate.subtract(1, 'day'), 'day')
    ) {
      let _calendar = _date.calendar().split(' at');
      return `${_calendar[0]},${_calendar[1]}`;
    } else if (_date.isSame(_todaysDate, 'week')) {
      return _date.format('dddd, h:mm a');
    } else {
      return _date.format('d MMM, h:mm a');
    }
  } else {
    if (typeof date !== 'object') {
      date = new Date(date);
    }
    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'year';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'month';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'day';
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = 'hour';
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = 'minute';
            } else {
              interval = seconds;
              intervalType = 'Just Now';
              return intervalType;
            }
          }
        }
      }
    }
    if (intervalType != 'Just Now') {
      if (interval > 1 || interval === 0) {
        intervalType += 's';
      }
      return interval + ' ' + intervalType + ' ' + 'ago';
    }
  }
}
