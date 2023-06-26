import { makeSessionCookie } from '#util/cookie.js';

const passwordUrl = '/password';
const passwordSessionCookieName = 'passwordSession';

export const getValidateEmail = (req, res) => {
  const {
    params: { emailValidationToken: validationToken },
    context: { di: { userService } },
  } = req;

  const { sessionKey } = userService.validateEmail({ validationToken }, req);

  res.cookie(...makeSessionCookie(
    passwordSessionCookieName,
    sessionKey,
    15,
  ));

  // const errors = fromJson(req?.cookies?.[errorCookieName]);

  // res.clearCookie(errorCookieName);
  // res.render(
  //   'web/form.html.view.pug',
  //   getFormConfig({
  //     formError: null,
  //     ...errors,
  //   }),
  // );

  // res.cookie(...makeErrorCookie(errorCookieName, result?.errors));
  res.redirect(passwordUrl);

  res.json({ ok: 'yay' });
};

export const getValidateReset = () => { };
