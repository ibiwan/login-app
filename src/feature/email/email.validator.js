import { FatalError } from '#feature/cookie/errorCookie.mw.js';
import validator from 'email-validator';

export const validateEmailField = (email, di) => {
  if (!validator.validate(email)) {
    throw new FatalError('emailErrors:email cannot be used')
  }

  const { userRepo: { getUserByEmail } } = di

  const existingUser = getUserByEmail({ email });

  if (existingUser) {
    console.error("tried to create existing user")
    return ['emailErrors:email cannot be used'];
  }

  return [];
};
