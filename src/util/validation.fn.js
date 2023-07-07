import { validateEmailField } from '#feature/email/email.validator.js';

import { validateSession } from '#feature/session/session.validator.js';

import {
  validateMatchingFields,
  validatePasswordFieldComplexity,
  validatePasswordFieldLength,
} from '#feature/password/password.validator.js';

export const getValidator = (validation) => {
  switch (validation) {
  case 'email': return [validateEmailField, true];
  case 'session': return [validateSession, true];
  case 'password-length': return [validatePasswordFieldLength];
  case 'password-complexity': return [validatePasswordFieldComplexity];
  case 'password-match': return [validateMatchingFields];
  default: return null;
  }
};
