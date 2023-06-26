export const getPasswordFormConfig = ({
  formError,
  passwordError,
  confirmPasswordError,
}) =>
  ({
    formTitle: 'Reset Password',
    submitLabel: 'Set Password',
    action: 'password',
    inputs: [
      {
        name: 'password',
        type: 'password',
        error: passwordError,
      },
      {
        name: 'confirm password',
        type: 'password',
        error: confirmPasswordError,
      },
    ],
    formError,
    links: [
      { href: 'create', text: 'create account' },
      { href: 'login', text: 'login to existing' },
    ],
  });
