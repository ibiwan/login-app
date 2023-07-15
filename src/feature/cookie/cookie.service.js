import { fromJson, toJson } from '#util/json.fn.js';

export const makeCookieService = (di) => {


  const messageCookieName = 'messageCookie';

  const makeCookieConf = (minutes) => {
    const { dateTimeService: { nowPlusMinutes } } = di
    return {
      secure: process.env.NODE_ENV !== 'development',
      expires: nowPlusMinutes(minutes),
      // new Date(Date.now() + 1000 * 60 * minutes),
      httpOnly: true,
      sameSite: true,
    };
  }

  const makeErrorCookie = (name, errors) =>
  ([
    name,
    toJson(errors),
    makeCookieConf(10),
  ]);

  /**
     * @param {*} name
     * @param {{sessionKey, email?}} data
     * @param {*} minutes
     * @returns
     */
  const makeSessionCookie = (data, minutes, name = 'loginSession') =>
  ([
    name,
    toJson(data),
    makeCookieConf(minutes),
  ]);

  const makeMessageCookie = (message) =>
  ([
    messageCookieName,
    message,
    makeCookieConf(10),
  ]);

  const extractCookie = (req, cookieName) => {
    const cookies = req?.cookies
    const text = cookies?.[cookieName];
    const parsed = fromJson(text);
    return parsed
  }

  return { makeErrorCookie, makeSessionCookie, makeMessageCookie, extractCookie }
}
