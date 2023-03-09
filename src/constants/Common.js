const currentYear = new Date().getFullYear().toString().slice(-2);
const currentMonth = new Date().getMonth() + 1;

const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formatPhoneNumber = (rawPhoneNumber, noOfDigits) => {
  const cleaned = `${rawPhoneNumber}`.replace(/\D/g, '');
  const match = cleaned.match(
    noOfDigits === 10
      ? /^(\d{5})(\d{5})$/
      : noOfDigits === 9
      ? /^(\d{5})(\d{4})$/
      : noOfDigits === 8
      ? /^(\d{5})(\d{3})$/
      : /^(\d{5})(\d{length})$/,
  );
  if (match) {
    const number = ['', match[1], '-', match[2]].join('');
    return number;
  }
  return rawPhoneNumber.replace(/-/g, '');
};
const trimWhiteSpace = val => {
  let regex = /^\s/;
  return regex.test(val);
};
const trimPhoneNo = val => val.replace(/\D/g, '');

const validateEmail = email => {
  return emailReg.test(email);
};

export {trimWhiteSpace, trimPhoneNo, formatPhoneNumber, validateEmail};

export function bindWebUrl(baseUrl, url) {
  let webUrl;
  if (url.length === 1) {
    webUrl = `${baseUrl}${url}`;
  } else if (url.length === 2) {
    webUrl = '';
  } else webUrl = url;
  return webUrl;
}
