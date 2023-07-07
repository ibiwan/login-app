import validator from 'email-validator';

export const validateEmailField = (email, di) => {
  if (!validator.validate(email)) {
    return ['emailErrors:email cannot be used'];
  }

  const { userRepo: { getUserByEmail } } = di

  const existingUser = getUserByEmail({ email });
  
  if (existingUser) {
    return ['emailErrors:email cannot be used'];
  }

  return [];
};
