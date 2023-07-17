
import { getPasswordFormConfig } from '#express/forms/password.form.config.js';

export const passwordUrl = '/password';

export const getPassword = (req, res, _next) => {
  const { context: { email } } = req

  res.render(
    'web/form.html.view.pug',
    getPasswordFormConfig({ email }),
  );
};

export const postPassword = (req, res) => {
  const { context: { di }, } = req;
  const { passwordService: setPassword } = di

  res.json(setPassword(req.body, req))
};
