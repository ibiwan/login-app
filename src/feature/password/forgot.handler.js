import { getForgotFormConfig } from '#express/forms/forgot.form.config.js';

export const getForgot = (req, res) =>
  res.render(
    'web/form.html.view.pug',
    getForgotFormConfig({
      formErrors: null,
      emailErrors: null,
    }),
  );

export const postForgot = () => {};
