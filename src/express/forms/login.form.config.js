export const getLoginFormConfig = ({
  formErrors,
  emailErrors,
  passwordErrors,
}) =>
  ({
    formTitle: 'Log In',
    submitLabel: 'Login',
    action: 'login',
    inputs: [
      {
        name: 'email',
        type: 'text',
        errors: emailErrors,
      },
      {
        name: 'password',
        type: 'password',
        errors: passwordErrors,
      },
    ],
    formErrors,
    links: [
      { href: 'create', text: 'create account' },
      { href: 'forgot', text: 'forgot password' },
    ],
  });
