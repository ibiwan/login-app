export const fromJson = (source, defaultValue = {}) =>
  (source ? JSON.parse(source) : defaultValue);

export const toJson = (source) =>
  (source ? JSON.stringify(source) : '');
