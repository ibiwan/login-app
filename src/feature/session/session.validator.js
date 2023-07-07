
export const validateSession = (sessionKey, di) => {
  const {
    sessionService: { getSessionByKey },
    dateTimeService: { isoNow },
  } = di

  const session = getSessionByKey({ sessionKey });

  if (!session) {
    return ['sessionError:invalid session key'];
  }

  const now = isoNow();
  if (session.expiresAt < now) {
    return ['sessionError:session expired; need new password reset email and key'];
  }

  return [];
};

export const validateTempSession = (di) =>
  (sessionKey, sessionEmail) => {
    const {
      sessionRepo: { getSessionByKey },
      emailRepo: { getValidEmailByUserId },
      errorService: { addErrors },
    } = di

    const session = getSessionByKey({ sessionKey });
    const email = getValidEmailByUserId({
      userId: session.userId,
    });

    if (email.email !== sessionEmail) {
      addErrors(['formErrors:stored email did not match stored user']);
    }

    const { userId } = session;
    const { id: emailId } = email;

    return { sessionKey, userId, emailId };
  };
