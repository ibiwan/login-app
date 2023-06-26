import { getCreateFormConfig } from '#forms/create.form.js';
import { getErrorableForm, postErrorableForm } from '#util/formHandlers.js';

const formUrl = '/create';
const errorCookieName = 'createUserErrors';
const di2method = (di) =>
  di.userService.create;

export const getCreate = getErrorableForm(
  errorCookieName,
  getCreateFormConfig,
);

export const postCreate = postErrorableForm(
  formUrl,
  errorCookieName,
  di2method,
);
