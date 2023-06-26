import validator from 'email-validator';

import { getUserByEmail } from '#db/schema/user.schema.js';
import { objAppend } from '#util/object.js';

export const validateEmail = (
  errors,
  email,
  db,
) => {
  if (!validator.validate(email)) {
    objAppend(errors, 'emailError', 'email cannot be used');
    return;
  }

  const existingUser = db
    .prepare(getUserByEmail)
    .get({ email });
  if (existingUser) {
    objAppend(errors, 'emailError', 'email cannot be used');
  }
};
