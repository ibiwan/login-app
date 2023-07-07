const minPassLength = 12;
const minClasses = 3;
const classMatchers = [
  /[a-z]/,
  /[A-Z]/,
  /[0-9]/,
  /\p{P}/u,
];

export const validateMatchingFields = (
  password,
  confirmPassword,
) => {
  if (password !== confirmPassword) {
    return ['confirmPasswordErrors:passwords do not match'];
  }
  return [];
};

export const validatePasswordFieldLength = (password) => {
  if (password.length < minPassLength) {
    return [`passwordErrors:password is too short (min ${minPassLength} characters)`];
  }
  return [];
};

export const validatePasswordFieldComplexity = (password) => {
  let classes = 0;
  classMatchers.forEach((re) => {
    if (re.test(password)) { classes += 1; }
  });
  if (classes < minClasses) {
    return ['passwordErrors:password is too simple (min 3 of uppercase, lowercase, digits, symbols)'];
  }
  return [];
};
