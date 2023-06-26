import { toJson } from '#util/json.js';

export const makeCookieConf = (minutes) =>
  ({
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(Date.now() + 1000 * 60 * minutes),
    httpOnly: true,
  });

export const makeErrorCookie = (name, errors) =>
  ([
    name,
    toJson(errors),
    makeCookieConf(10),
  ]);

/**
   * @param {*} name
   * @param {{sessionKey, email}} data
   * @param {*} minutes
   * @returns
   */
export const makeSessionCookie = (name, data, minutes) =>
  ([
    name,
    toJson(data),
    makeCookieConf(minutes),
  ]);
