import { getPasswordFormConfig } from '#forms/password.form.js';
import { fromJson } from '#util/json.js';

export const passwordUrl = '/password';
export const passwordSessionCookieName = 'passwordSession';
const errorCookieName = 'resetPasswordErrors';

export const getPassword = (req, res) => {
  const { context: { di: { userService } } } = req;

  const { sessionKey, email } = fromJson(req?.cookies?.[passwordSessionCookieName]);

  const valid = userService.validateSession(sessionKey);

  console.log(valid);

  res.clearCookie(errorCookieName);
  // res.render(
  //   'web/form.html.view.pug',
  //   getFormConfig({
  //     formError: null,
  //     ...errors,
  //   }),
  // );

  // res.cookie(...makeErrorCookie(errorCookieName, result?.errors));

  const errors = fromJson(req?.cookies?.[errorCookieName]);

  // res.clearCookie(errorCookieName);
  // res.render(
  //   'web/form.html.view.pug',
  //   getFormConfig({
  //     formError: null,
  //     ...errors,
  //   }),
  // );

  res.render(
    'web/form.html.view.pug',
    getPasswordFormConfig({
      email,
      ...errors,
      formError: null,
      passwordError: null,
      confirmPasswordError: null,
    }),
  );
};

export const postPassword = () => { };

// const di2method = (di) =>
//   di.userService.create;

// export const getCreate = getErrorableForm(
//   errorCookieName,
//   getCreateFormConfig,
// );

// export const postCreate = postErrorableForm(
//   formUrl,
//   errorCookieName,
//   di2method,
// );
