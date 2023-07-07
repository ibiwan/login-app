export const getCreateFormConfig = ({
  formErrors,
  emailErrors,
}) =>
  ({
    formTitle: 'Create Account',
    submitLabel: 'Create',
    action: 'create',
    inputs: [
      {
        name: 'email',
        type: 'text',
        errors: emailErrors,
      },
    ],
    formErrors,
    links: [
      { href: 'login', text: 'login to existing' },
      { href: 'forgot', text: 'forgot password' },
    ],
  });
