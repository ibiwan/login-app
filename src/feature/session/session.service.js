
export const makeSessionService = (di) => {
  const createLoginSession = (userId, minutes = 300, isPassOnly = false) => {
    const {
      errorService: { addErrors },
      sessionRepo: { createSession },
      cryptoService: { randomUUID },
      dateTimeService: { isoNow, isoNowPlusMinutes },
    } = di;
    const sessionKey = randomUUID();

    const config = {
      userId,
      sessionKey,
      createdAt: isoNow(),
      expiresAt: isoNowPlusMinutes(minutes),
      isPassOnly: isPassOnly ? 1 : 0,
    }

    const {
      changes: sessionChanges,
      lastInsertRowid: _newSessionId,
    } = createSession(config);

    if (sessionChanges === 0) {
      addErrors(['session could not be created']);

      return null;
    }

    return { sessionKey, minutes };
  }

  const createPasswordSession = (userId) => createLoginSession(userId, 15, true);

  const invalidateSession = (sessionKey) => {
    const {
      errorService: { addErrors },
      dateTimeService: { isoNow },
      sessionRepo: { invalidateSessionByKey },
    } = di;

    const {
      changes: invalidateChanges,
      lastInsertRowid: _updatedSessionId,
    } = invalidateSessionByKey({
      sessionKey,
      invalidatedAt: isoNow(),
    });

    if (invalidateChanges > 0) {
      addErrors(['temp session could not be invalidated'])
    }
  }

  const replacePasswordSession = (oldSessionKey, userId) => {
    const {
      errorService: { addErrors, hasErrors },
    } = di;

    const newSessionKey = createLoginSession(userId)
    if (!hasErrors()) {
      invalidateSession(oldSessionKey)

      return newSessionKey;
    }

    return null;
  };

  return {
    createLoginSession,
    createPasswordSession,
    replacePasswordSession,
    invalidateSession,
  };
};
