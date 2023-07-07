import { getLoginFormConfig } from '#express/forms/login.form.config.js';

export const getLogin = (req, res) =>
  res.render(
    'web/form.html.view.pug',
    getLoginFormConfig({
      formErrors: null,
      emailErrors: null,
      passwordErrors: null,
    }),
  );

export const postLogin = () => {};
