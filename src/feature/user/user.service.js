import { compareSync } from 'bcrypt';

import { makeValidateTokenUrl } from '#express/middleware/url.mw.js';

export const makeUserService = (di) => {
  /**
   * @param {{email:string, password:string}} param0 
   */
  const login = ({ email, password }) => {
    const {
      emailRepo: { getEmailByEmailAddress },
      userRepo: { getUserById },
      sessionService: { createLoginSession },
    } = di;

    const emailData = getEmailByEmailAddress({ email });
    console.log({ emailData })
    if (!emailData) {
      console.error("email was not found in db");
      return { success: false, errors: ['could not log in with that email/password combination'] }
    }

    const { userId, isValidated } = emailData;
    if (!userId || !isValidated) {
      console.error("no user id was configured for email")
      return { success: false, errors: ['have you validated your email address?'] }
    }

    const userData = getUserById({ userId });
    if (!userData || !userData.isValid) {
      console.error("no user was found for user id")
      return { success: false, errors: ['could not log in with that email/password combination'] };
    }
    const { passhash } = userData;
    console.log({ userData })
    if (!passhash) {
      console.error('no password has been set for user');
      return { success: false, errors: ['you need to set your password'] };
    }

    const isMatch = compareSync(password, passhash)
    if (!isMatch) {
      console.error('password did not match that set in db');
      return { success: false, errors: ['could not log in with that email/password combination'] };
    }

    const { sessionKey, minutes } = createLoginSession(userId)

    return { success: true, email, sessionKey, minutes }
  }

  /**
   * @param {{email:string}} param0
   * @param {*} req
   * @returns
   */
  const create = ({ email }, req) => {
    const {
      emailService: { createEmailWithoutUser },
      errorService: { hasErrors, getErrors },
      validationService: { validateEmail },
      jobQueueService: { queueMessage },
    } = di;

    validateEmail(email);
    if (hasErrors()) {
      console.error({ errors: getErrors() })
      return { success: false, errors: getErrors() }
    }

    const created = createEmailWithoutUser(
      email,
    );

    if (!created) {
      console.error({ errors: getErrors() })
      return { success: false, errors: ['account could not be created'] }
    }

    const { validationToken, emailId, ...dates } = created

    const baseUrl = req.context.baseUrl
    const validationLink = makeValidateTokenUrl(baseUrl, validationToken);

    queueMessage(
      emailId,
      'Validate Your Email!',
      'email/welcomeAndValidate.email.view.pug',
      {
        email,
        validationToken,
        validationLink,
        ...dates,
      },
    );

    return {
      success: true,
      message: 'check your email for next steps',
    }
  };

  return {
    create,
    login,
  };
};
