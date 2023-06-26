// import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';
import url from 'url'

// import { validateMatching, validatePassword } from '#validators/password.validator.js';
import { createUser } from '#db/schema/user.schema.js';

import { objAppend } from '#util/object.js';

import {
  getValidEmailByUserId,
  createOrphanEmail,
  getEmailByToken,
  attachToUserId,
  setIsValidated,
} from '#db/schema/emailAddress.schema.js';

import {
  getSessionByKey,
  createSession,
} from '#db/schema/session.schema.js';

import {
  isoNowPlusMinutes,
  isoNow,
} from '#util/datetime.js';

function tokenUrl(req, token) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: `validate/${token}`
  });
}

export const makeUserService = (di) => {
  const { db } = di.dbService;
  const { queueMessage } = di.emailService;

  const create = ({
    email
    // , password, confirmPassword
  }, req) => {
    const errors = {};

    // validateMatching(errors, password, confirmPassword);
    // validatePassword(errors, password);
    validateEmail(errors, email, db);

    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    // const passhash = hashSync(password, 14);
    const emailAddedAt = isoNow();
    const validationExpiresAt = isoNowPlusMinutes(60);
    const validationToken = randomUUID()

    const { changes, lastInsertRowid } = db
      .prepare(createOrphanEmail)
      .run({ email, emailAddedAt, validationToken, validationExpiresAt });

    if (changes < 1) {
      objAppend(
        errors,
        'formError',
        'unknown error creating user',
      );

      return { errors };
    }

    const validationLink = tokenUrl(req, validationToken)

    queueMessage(
      lastInsertRowid,
      'Validate Your Email!',
      'email/welcomeAndValidate.email.view.pug',
      {
        email,
        emailAddedAt,
        validationToken,
        validationExpiresAt,
        validationLink,
      })

    return {};
  };

  const validateEmail = ({ validationToken }, _req) => {
    const email = db
      .prepare(getEmailByToken)
      .get({ validationToken });

    console.log({ validationToken, email })

    if (!email) { return 'token is invalid'; }

    // const { changes: validationChanges } = db.prepare(setIsValidated).run({
    //   emailId: email.id,
    //   emailValidatedAt: isoNow()
    // })

    // console.log({ validationChanges })

    // if(validationChanges === 0){return 'could not mark email validated'}

    let userId = email.userId

    if (userId == null) {
      const { changes, lastInsertRowid } = db.prepare(createUser).run({
        createdAt: isoNow()
      })

      if (changes > 0) {
        userId = lastInsertRowid
        db.prepare(attachToUserId).run({
          emailId: email.id,
          userId: lastInsertRowid,
        })
      }
    }

    if (!userId) { return 'user could not be associated'; }

    const sessionKey = randomUUID();
    const createdAt = isoNow();
    const expiresAt = isoNowPlusMinutes(10);
    const { changes, lastInsertRowid: _id } = db.prepare(createSession).run({
      sessionKey,
      userId,
      createdAt,
      expiresAt,
    })

    console.log({ changes, sessionKey })

    if (changes === 0) { return 'session could not be created' }

    return {
      email: email.email,
      sessionKey
    }
  }

  const validateSession = (sessionKey) => {
    const session = db.prepare(getSessionByKey).get({ sessionKey });
    if (!session) {
      return 'invalid session key';
    }

    const now = isoNow();
    if (session.expiresAt < now) {
      return 'session expired; need new password reset email and key';
    }

    return true;
  }

  return {
    create,
    validateEmail,
    validateSession,
  };
};
