import { toJson } from '#util/json.fn.js';

export const makeCookieService = (di) => {
  const makeCookieConf = (minutes) => {
    const { dateTimeService: {
      nowPlusMinutes
    } } = di

    return {
      secure: process.env.NODE_ENV !== 'development',
      expires: nowPlusMinutes(minutes),
      httpOnly: true,
      sameSite: true,
    };
  }

  /**
     * @param {*} name
     * @param {{sessionKey, email?}} data
     * @param {*} minutes
     * @returns
     */
  const makeSessionCookie = (
    data,
    minutes,
    name = 'session',
  ) =>
  ([
    name,
    toJson(data),
    makeCookieConf(minutes),
  ]);

  return { makeSessionCookie }
}
