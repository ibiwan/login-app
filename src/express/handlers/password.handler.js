import { getErrorableForm, postErrorableForm } from '#express/forms/formHandlers.fn.js';

import { getPasswordFormConfig } from '#express/forms/password.form.config.js';

export const passwordUrl = '/password';
export const passwordSessionCookieName = 'passwordSession';
const errorCookieName = 'resetPasswordErrors';

const di2method = (di) =>
  di.passwordService.setPassword;

export const getPassword = getErrorableForm(
  errorCookieName,
  passwordUrl,
  getPasswordFormConfig,
  passwordSessionCookieName,
);

export const postPassword = postErrorableForm(
  errorCookieName,
  passwordUrl,
  di2method,
);
