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
        addErrors(['formErrors:could not create account'])
        return null
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
    } = di;

    const email = getEmailByToken({ validationToken });

    if (!email) { return 'token is invalid'; }

    const { changes: validationChanges } = setIsValidated({
      emailId: email.id,
      emailValidatedAt: isoNow(),
    });

    if (validationChanges === 0) { return 'could not mark email validated'; }

    let { userId } = email;

    if (userId == null) {
      const { changes: userChanges, lastInsertRowid: newUserId } = createUser({
        createdAt: isoNow(),
      });

      if (userChanges > 0) {
        userId = newUserId;
        attachToUserId({
          emailId: email.id,
          userId: newUserId,
        });
      }
    }

    if (!userId) { return 'user could not be associated'; }

    const sessionKey = createPasswordSession(userId)

    return {
      email: email.email,
      sessionKey,
    };
  };

  return {
    setEmailValidated,
    setValidationEmailSentAt,
    createEmailWithoutUser,
  };
};
