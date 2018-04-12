import moment from 'moment';

// Convert array to object with given field's value as key
export const arrToObj = (arr, field) => {
  const newObj = {};
  arr.forEach((item) => {
    newObj[item[field]] = item;
  });
  return newObj;
};

// Return user friendly formatted date
export const formatDate = timestamp => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
