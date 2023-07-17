import { extractCookie } from '#feature/cookie/cookie.fn.js'
import { FatalError } from '#feature/cookie/errorCookie.mw.js';
import { validateSession } from '#feature/session/session.validator.js';

export const useSessionCookie = (needsFull) => (req, res, next) => {
  const { di } = req.context;
  const { emailRepo: { getValidEmailByUserId } } = di;

  const { sessionKey, email: cookieEmail } = extractCookie(req, 'session')

  const { userId, isPassOnly } = validateSession(sessionKey, di)

  const sessionEmailData = getValidEmailByUserId({ userId })

  const { email: sessionEmail } = sessionEmailData

  if (cookieEmail !== sessionEmail) {
    throw new FatalError('session is not valid for current user')
  }

  if (needsFull && isPassOnly) {
    throw new FatalError('session is only valid for setting password')
  }

  req.context = {
    ...req.context,
    sessionKey,
    email: sessionEmail,
  }

  next()
}
