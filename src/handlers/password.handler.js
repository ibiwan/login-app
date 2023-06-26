import { getPasswordFormConfig } from '#forms/password.form.js';

export const getPassword = (req, res) =>
  res.render(
    'web/form.html.view.pug',
    getPasswordFormConfig({
      formError: null,
      passwordError: null,
      confirmPasswordError: null,
    }),
  );

export const postPassword = () => {};
