import { contextify } from '#util/context.fn.js';

export const getErrorableForm = (
  errorCookieName,
  errorRedirectUrl,
  getFormConfig,
  sessionCookieName = null,
) =>
  (req, res, _next) => {
    const {
      di: {
        cookieService: { extractCookie },
        validationService: { validateSessionKey },
        errorService: { hasErrors }
      },
    } = req.context;

    contextify(
      req,
      {
        errorCookieName,
        errorRedirectUrl,
      },
    );

    const formErrors = extractCookie(req, errorCookieName);

    res.clearCookie(errorCookieName);

    if (sessionCookieName) {
      const { sessionKey } = extractCookie(req, sessionCookieName);
      validateSessionKey(sessionKey);
    }

    if (!hasErrors()) {
      res.render(
        'web/form.html.view.pug',
        getFormConfig(formErrors),
      );
    }
  };

export const postErrorableForm = (
  errorCookieName,
  errorRedirectUrl,
  di2method,
) =>
  (req, res) => {
    const {
      context: { di },
    } = req;

    const { errorService: { hasErrors, getErrors } } = di

    contextify(
      req,
      {
        errorCookieName,
        errorRedirectUrl,
      },
    );

    const method = di2method(di);
    const result = method(req.body, req);

    if (result) {
      const {
        cookies = [],
        redirectUrl = '/success',
      } = result;

      if (!hasErrors()) {
        res.clearCookie(errorCookieName);

        cookies.forEach((cookie) =>
          res.cookie(...cookie));

        res.redirect(redirectUrl);
      }
    } else {
      console.error(getErrors())
    }
  };
