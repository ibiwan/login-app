
import { makeValidateTokenUrl } from '#express/middleware/url.mw.js';

export const makeUserService = (di) => {
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
      cookieService: { makeMessageCookie },
      jobQueueService: { queueMessage },
    } = di;

    validateEmail(email);
    if (hasErrors()) return getErrors();

    const created = createEmailWithoutUser(
      email,
    );

    if (!created) {
      return null // TODO handle this in UX?
    }

    const { validationToken, emailId, ...dates } = created

    const validationLink = makeValidateTokenUrl(req, validationToken);

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
      cookies: [
        makeMessageCookie('check your email for next steps'),
      ],
    };
  };

  return {
    create,
  };
};
