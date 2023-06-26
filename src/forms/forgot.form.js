export const getForgotFormConfig = ({
  formError,
  emailError,
}) =>
  ({
    formTitle: 'Forgot Password',
    submitLabel: 'Send Reset Link',
    action: 'forgot',
    inputs: [
      {
        name: 'email',
        type: 'text',
        error: emailError,
      },
    ],
    formError,
    links: [
      { href: 'create', text: 'create account' },
      { href: 'login', text: 'login to existing' },
    ],
  });
