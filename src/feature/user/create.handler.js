import { getCreateFormConfig } from '#express/forms/create.form.config.js';

import {
  getErrorableForm,
  postErrorableForm,
} from '#express/forms/formHandlers.fn.js';

const createUrl = '/create';
const errorCookieName = 'createUserErrors';

const di2method = (di) =>
  di.userService.create;

export const getCreate = getErrorableForm(
  errorCookieName,
  createUrl,
  getCreateFormConfig,
);

export const postCreate = postErrorableForm(
  errorCookieName,
  createUrl,
  di2method,
);
