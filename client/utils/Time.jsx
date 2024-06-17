import moment from 'moment-timezone';

export const convertToIST = (utcDateString) => {
  return moment(utcDateString).tz('Asia/Kolkata').format('DD/MM/YYYY, hh:mm:ss A');
};
