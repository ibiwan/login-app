import { FatalError } from '#feature/cookie/errorCookie.mw.js';

export const makeEmailService = (di) => {
  const createEmailWithoutUser = (email) => {
    const {
      emailRepo: { createOrphanEmail },
      cryptoService: { randomUUID },
      errorService: { addErrors },
      dateTimeService: {
        isoNowPlusMinutes,
        isoNow,
      },
    } = di

    const emailAddedAt = isoNow();
    const validationExpiresAt = isoNowPlusMinutes(60);
    const validationToken = randomUUID()

    try {
      const { changes: emailChanges, lastInsertRowid: emailId } =
        createOrphanEmail({ email, emailAddedAt, validationToken, validationExpiresAt });

      if (emailChanges < 1) {
        addErrors(['formErrors:no db change on email creation'])
      }

      return { validationExpiresAt, validationToken, emailId, emailAddedAt };
    } catch (e) {
      if (e.message.includes('UNIQUE constraint failed')) {
        throw new FatalError('email address is already in use')
      } else {
        throw e
      }
    }
  }

  const setValidationEmailSentAt = ({ emailId }) => {
    const {
      dateTimeService: { isoNow },
      emailRepo: { setValidationTokenSent },
    } = di
    setValidationTokenSent({ emailId, validationSentAt: isoNow() })
  }

  const setEmailValidated = ({ validationToken }, _req) => {
    const {
      sessionService: { createPasswordSession },
      emailRepo: { getEmailByToken, setIsValidated, attachToUserId },
      userRepo: { createUser },
      dateTimeService: { isoNow },
      errorService: { addErrors },
    } = di;

    const email = getEmailByToken({ validationToken });
    if (!email) {
      addErrors(['token is invalid'])
      throw new FatalError();
    }

    const { changes: validationChanges } = setIsValidated({
      emailId: email.id,
      emailValidatedAt: isoNow(),
    });
    if (validationChanges === 0) {
      addErrors(['could not mark email validated'])
      throw new FatalError();
    }

    let { userId } = email;

    if (userId == null) {
      const {
        changes: userChanges,
        lastInsertRowid: newUserId,
      } = createUser({
        createdAt: isoNow(),
      });

      if (userChanges === 0) {
        addErrors(['could not create user for email'])
        throw new FatalError();
      }
      userId = newUserId;

      attachToUserId({
        emailId: email.id,
        userId,
      });
    }

    if (!userId) {
      addErrors(['user could not be associated'])
      throw new FatalError();
    }

    const { sessionKey, minutes } = createPasswordSession(userId)

    return {
      email: email.email,
      sessionKey,
      minutes,
    };
  };

  return {
    setEmailValidated,
    setValidationEmailSentAt,
    createEmailWithoutUser,
  };
};
