export const getLoginFormConfig = ({
  formError,
  emailError,
  passwordError,
}) =>
  ({
    formTitle: 'Log In',
    submitLabel: 'Login',
    action: 'login',
    inputs: [
      {
        name: 'email',
        type: 'text',
        error: emailError,
      },
      {
        name: 'password',
        type: 'password',
        error: passwordError,
      },
    ],
    formError,
    links: [
      { href: 'create', text: 'create account' },
      { href: 'forgot', text: 'forgot password' },
    ],
  });
