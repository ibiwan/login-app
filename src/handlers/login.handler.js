import { getLoginFormConfig } from '#forms/login.form.js';

export const getLogin = (req, res) =>
  res.render(
    'web/form.html.view.pug',
    getLoginFormConfig({
      formError: null,
      emailError: null,
      passwordError: null,
    }),
  );

export const postLogin = () => {};
