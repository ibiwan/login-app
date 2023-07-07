export const getPasswordFormConfig = ({
  email,
  formErrors,
  passwordErrors,
  confirmPasswordErrors,
}) =>
  ({
    formTitle: 'Reset Password',
    submitLabel: 'Set Password',
    action: 'password',
    inputs: [
      {
        name: 'email',
        type: 'hidden',
        value: email,
        errors: null,
      },
      {
        name: 'password',
        type: 'password',
        errors: passwordErrors,
      },
      {
        name: 'confirm password',
        type: 'password',
        errors: confirmPasswordErrors,
      },
    ],
    formErrors,
    links: [
      { href: 'create', text: 'create account' },
      { href: 'login', text: 'login to existing' },
    ],
  });
