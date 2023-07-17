import { hashSync } from 'bcrypt';

export const makePasswordService = (di) => {
  const setValidPassword = (
    userId,
    password,
  ) => {
    const {
      errorService: { addErrors },
      dateTimeService: { isoNow },
      userRepo: { setPasshash },
    } = di;

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
      cookieService: {
        makeSessionCookie,
        extractCookie,
      },
      errorService: {
        hasErrors,
      },
    } = di;

    validatePasswords(password, confirmPassword);
    if (hasErrors()) return false;

    const {
      sessionKey,
      email: sessionEmail,
    } = extractCookie(
      req,
      'session',
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
