import { passwordSessionCookieName, passwordUrl } from '#handlers/password.handler.js';
import { makeSessionCookie } from '#util/cookie.js';

export const getValidateEmail = (req, res) => {
  const {
    params: { emailValidationToken: validationToken },
    context: { di: { userService } },
  } = req;

  const { sessionKey, email } = userService.validateEmail({ validationToken }, req);

  res.cookie(...makeSessionCookie(
    passwordSessionCookieName,
    { sessionKey, email },
    15,
  ));
  res.redirect(passwordUrl);
};

export const getValidateReset = () => {

};
