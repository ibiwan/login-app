import { getForgotFormConfig } from '#forms/forgot.form.js';

export const getForgot = (req, res) =>
  res.render(
    'web/form.html.view.pug',
    getForgotFormConfig({
      formError: null,
      emailError: null,
    }),
  );

export const postForgot = () => {};
