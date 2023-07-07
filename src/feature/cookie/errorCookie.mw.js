import { errorsByFields } from '#util/error.fn.js';

export const errorCookieMiddleware = (req, res, next) => {
  next();

  const {
    errorCookieName,
    errorRedirectUrl,
    di: { cookieService: { makeErrorCookie } },
    reqDi: { errorService: { getErrors } }
  } = req.context;

  const errorStrings = errorCookieName ? getErrors() : [];

  if (errorStrings.length > 0) {
    console.error({ errorStrings })
    const errors = errorsByFields(errorStrings);
    res.cookie(...makeErrorCookie(
      errorCookieName,
      errors,
    ));

    if (errorRedirectUrl) {
      res.redirect(errorRedirectUrl);
    }
  }
};
