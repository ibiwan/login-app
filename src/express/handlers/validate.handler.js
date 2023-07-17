import { passwordUrl } from '#express/handlers/password.handler.js';

export const getValidateEmail = (req, res) => {
  const {
    params: { emailValidationToken: validationToken },
    context: {
      di: {
        cookieService: { makeSessionCookie },
        emailService: { setEmailValidated },
      },
    },
  } = req;

  const {
    sessionKey,
    email,
    minutes,
  } = setEmailValidated({ validationToken }, req);

  res.cookie(...makeSessionCookie(
    { sessionKey, email },
    minutes,
    'session',
  ));
  res.redirect(passwordUrl);
  res.json({ success: true })
};
