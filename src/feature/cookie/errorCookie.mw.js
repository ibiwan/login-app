import { errorsByFields } from '#util/error.fn.js';

export class FatalError extends Error { }

export const nonfatalErrorCookieMiddleware = async (req, res, next) => {
  await next();
  handleValidation(req, res);
}

export const fatalErrorCookieMiddleware = async (err, req, res, next) => {
  if (err instanceof FatalError) {
    const handled = handleValidation(req, res)
    if (!handled) {
      res.json("no")
    }
  } else {
    next(err);
  }
}

const handleValidation = (req, res) => {
  const {
    errorCookieName,
    errorRedirectUrl,
    di: {
      cookieService: { makeErrorCookie },
      errorService: { getErrors },
    }
  } = req.context;

  const errorStrings = errorCookieName ? getErrors() : [];

  //TODO: handle non-form errors (e.g. token links)

  if (errorStrings.length > 0) {
    const errors = errorsByFields(errorStrings);
    const cookieParams = makeErrorCookie(
      errorCookieName,
      errors,
    );

    res.cookie(...cookieParams);

    if (errorRedirectUrl) {
      res.redirect(errorRedirectUrl);
      return true
    }
  }
  return false;
}
