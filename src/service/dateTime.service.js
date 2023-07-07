export const makeDateTimeService = () => {
  const isoNow = () =>
    (new Date()).toISOString();

  const isoNowPlusMinutes = (m) =>
    nowPlusMinutes(m).toISOString();

  const nowPlusMinutes = (m) =>
    new Date(Date.now() + m * 60 * 1000)

  return {
    isoNow,
    isoNowPlusMinutes,
    nowPlusMinutes
  }
}
