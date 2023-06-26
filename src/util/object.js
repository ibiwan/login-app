export const objAppend = (obj, key, value) => {
  // eslint-disable-next-line no-param-reassign
  if (!(key in obj)) { obj[key] = []; }
  obj[key].push(value);
};
