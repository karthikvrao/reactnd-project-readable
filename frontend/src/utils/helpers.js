// Convert array to object with given field's value as key
export const arrToObj = (arr, field) => {
  const newObj = {};
  arr.forEach((item) => {
    newObj[item[field]] = item;
  });
  return newObj;
};
