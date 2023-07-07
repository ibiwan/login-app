import { passwordSessionCookieName, passwordUrl } from '#express/handlers/password.handler.js';

export const getValidateEmail = (req, res) => {

  const {
    params: { emailValidationToken: validationToken },
    context: {
      reqDi: {
        cookieService: { makeSessionCookie },
        emailService: { setEmailValidated },
      },
    },
  } = req;

  const { sessionKey, email } = setEmailValidated({ validationToken }, req);

  res.cookie(...makeSessionCookie(
    { sessionKey, email },
    15,
    passwordSessionCookieName,
  ));
  res.redirect(passwordUrl);
};
