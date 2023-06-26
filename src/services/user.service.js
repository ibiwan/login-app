// import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';
import url from 'url'

// import { validateMatching, validatePassword } from '#validators/password.validator.js';

import { objAppend } from '#util/object.js';
import { isoNow, isoNowPlusMinutes } from '#util/datetime.js';

import { attachToUserId, createOrphanEmail, getEmailByToken, setIsValidated } from '#db/schema/emailAddress.schema.js';
import { createUser, createUserWithPassword, getUserById } from '#db/schema/user.schema.js';
import { createSession } from '#db/schema/session.schema.js';

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

  const validateEmail = ({ validationToken }, req) => {
    // console.log({ validationToken })
    const email = db
      .prepare(getEmailByToken)
      .get({ validationToken });

    if (!email) { return 'token is invalid'; }

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

    if (changes === 0) { return 'session could not be created' }

    return {
      email: email.email,
      sessionKey
    }
  }

  return {
    create,
    validateEmail,
  };
};
