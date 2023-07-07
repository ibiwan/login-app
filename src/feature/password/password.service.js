import { hashSync } from 'bcrypt';

import { passwordSessionCookieName } from '#express/handlers/password.handler.js';

export const makePasswordService = (reqDi) => {
  const setValidPassword = (
    userId,
    password,
  ) => {
    const {
      errorService: { addErrors },
      userRepo: { setPasshash },
      dateTimeService: { isoNow },
    } = reqDi;

    const passhash = hashSync(password, 14);
    const {
      changes: passwordChanges,
      lastInsertRowid: _editedUserId,
    } = setPasshash({
      userId,
      passhash,
      passhashSetAt: isoNow(),
    });

    if (!passwordChanges) {
      addErrors(['passwordError:password could not be set']);
    }
  };

  const setPassword = (
    { password, confirmPassword },
    req,
  ) => {
    const {
      sessionService: { replacePasswordSession },
      jobQueueService: { queueMessage },
      validationService: {
        validatePasswordSession,
        validatePasswords,
      },
      errorService: {
        hasErrors,
      },
      cookieService: { extractCookie, makeSessionCookie },
    } = reqDi;

    validatePasswords(password, confirmPassword);
    if (hasErrors()) return false;

    const {
      sessionKey,
      email: sessionEmail,
    } = extractCookie(
      req,
      passwordSessionCookieName,
    );

    const {
      sessionKey: oldSessionKey,
      emailId,
      userId,
    } = validatePasswordSession(sessionKey, sessionEmail);

    setValidPassword(userId, password);

    if (hasErrors()) { return {}; }

    const newSessionKey = replacePasswordSession(oldSessionKey, userId);

    queueMessage(
      emailId,
      'Password has been Set!',
      'accountSuccess.email.view.pug',
      {},
    );

    return {
      cookies: [
        makeSessionCookie({ sessionKey: newSessionKey }),
      ],
      redirectUrl: '/login',
    };
  };

  return { setPassword };
};
