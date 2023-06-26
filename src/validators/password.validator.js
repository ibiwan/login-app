import { objAppend } from '#util/object.js';

const minPassLength = 12;
const minClasses = 3;
const classMatchers = [
  /[a-z]/,
  /[A-Z]/,
  /[0-9]/,
  /\p{P}/u,
];

export const validateMatching = (
  errors,
  password,
  confirmPassword,
) => {
  if (password !== confirmPassword) {
    objAppend(
      errors,
      'confirmPasswordError',
      'passwords do not match',
    );
  }
};

export const validatePassword = (errors, password) => {
  if (password.length < minPassLength) {
    objAppend(
      errors,
      'passwordError',
      'password is too short '
        + `(min ${minPassLength} characters)`,
    );
  }

  let classes = 0;
  classMatchers.forEach((re) => {
    if (re.test(password)) { classes += 1; }
  });
  if (classes < minClasses) {
    objAppend(
      errors,
      'passwordError',
      'password is too simple '
        + '(min 3 of uppercase, lowercase, digits, symbols)',
    );
  }
};
