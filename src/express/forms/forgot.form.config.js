export const getForgotFormConfig = ({
  formErrors,
  emailErrors,
}) =>
  ({
    formTitle: 'Forgot Password',
    submitLabel: 'Send Reset Link',
    action: 'forgot',
    inputs: [
      {
        name: 'email',
        type: 'text',
        errors: emailErrors,
      },
    ],
    formErrors,
    links: [
      { href: 'create', text: 'create account' },
      { href: 'login', text: 'login to existing' },
    ],
  });
