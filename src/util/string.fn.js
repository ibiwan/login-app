const words = (str) =>
  str.split(' ');

const titleWord = (word) =>
  word.slice(0, 1).toUpperCase()
  + word.slice(1).toLowerCase();

export const titleize = (str) =>
  words(str).map(titleWord).join(' ');

export const camelize = (str) =>
  words(str).map((word, i) =>
    (i === 0
      ? word.toLowerCase()
      : titleWord(word)
    )).join('');
