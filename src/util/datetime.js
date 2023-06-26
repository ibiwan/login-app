export const isoNow = () =>
  (new Date()).toISOString();

export const isoNowPlusMinutes = (m) =>
  (new Date(Date.now() + m * 60 * 1000)).toISOString();
