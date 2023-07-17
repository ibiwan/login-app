import { getLoginFormConfig } from '#express/forms/login.form.config.js';

export const getLogin = (req, res) =>
  res.render(
    'web/form.html.view.pug',
    getLoginFormConfig(),
  );

export const postLogin = (req, res) => {
  const { context: { di }, } = req;
  const {
    userService: { login },
    cookieService: { makeSessionCookie }
  } = di

  const { success, errors, sessionKey, minutes, email } = login(req.body);

  const response = { success, errors }

  res.clearCookie('session')
  if (success) {
    res.cookie(...makeSessionCookie({ sessionKey, email }, minutes, 'session'))
    response.redirect = '/home'
  }

  res.json(response)
};
