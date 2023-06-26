import { makeErrorCookie } from '#util/cookie.js';
import { fromJson } from '#util/json.js';

export const getErrorableForm = (errorCookieName, getFormConfig) =>
  (req, res) => {
    const errors = fromJson(req?.cookies?.[errorCookieName]);

    res.clearCookie(errorCookieName);
    res.render(
      'web/form.html.view.pug',
      getFormConfig({
        formError: null,
        ...errors,
      }),
    );
  };

export const postErrorableForm = (url, errorCookieName, di2method) =>
  (req, res) => {
    const result = di2method(req.context.di)(req.body, req);

    if ('errors' in result) {
      res.cookie(...makeErrorCookie(errorCookieName, result?.errors));
      res.redirect(url);
    } else {
      res.clearCookie(errorCookieName);
      res.redirect('/success');
    }
  };
