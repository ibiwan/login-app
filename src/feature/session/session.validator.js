import { FatalError } from '#feature/cookie/errorCookie.mw.js';

export const validateSession = (sessionKey, di) => {
  const {
    sessionRepo: { getSessionByKey },
    dateTimeService: { isoNow },
  } = di

  const session = getSessionByKey({ sessionKey });
  if (!session) {
    throw new FatalError('unknown session key')
  }

  const now = isoNow();
  if (session.expiresAt < now) {
    throw new FatalError('expired session key')
  }

  return session;
};
