export const getCreateFormConfig = ({
  formError,
  emailError,
  // passwordError,
  // confirmPasswordError,
}) =>
  ({
    formTitle: 'Create Account',
    submitLabel: 'Create',
    action: 'create',
    inputs: [
      {
        name: 'email',
        type: 'text',
        error: emailError,
      },
      // {
      //   name: 'password',
      //   type: 'password',
      //   error: passwordError,
      // },
      // {
      //   name: 'confirm password',
      //   type: 'password',
      //   error: confirmPasswordError,
      // },
    ],
    formError,
    links: [
      { href: 'login', text: 'login to existing' },
      { href: 'forgot', text: 'forgot password' },
    ],
  });
