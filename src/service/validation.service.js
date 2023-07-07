import { getValidator } from '#util/validation.fn.js';

import { validateTempSession } from '#feature/session/session.validator.js';

export const makeValidationService = (di) => {
  const validateAs = (validation) =>
    (...data) => {
      const { errorService: { addErrors } } = di;
      const params = data;

      const [validator] = getValidator(validation);

        params.push(di);

      if (typeof validator === 'function') {
        addErrors(validator(...params));
      }
    };

  const validateEmail = validateAs('email');
  const validateSessionKey = validateAs('session');

  const validatePasswords = (password, confirmPassword) => {
    validateAs('password-length')(password);
    validateAs('password-complexity')(password);
    validateAs('password-match')(password, confirmPassword);
  };

  const validateTempSessionKey = (sessionKey, sessionEmail) => {
    return validateTempSession(di)(sessionKey, sessionEmail);
  };

  return {
    validateSessionKey,
    validateTempSessionKey,
    validatePasswords,
    validateEmail,
  };
};
