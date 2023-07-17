export const getPasswordFormConfig = ({
  email
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
    },
    {
      name: 'password',
      type: 'password',
      autocomplete: 'new-password',
    },
    {
      name: 'confirm password',
      type: 'password',
      autocomplete: 'new-password',
    },
  ],
  links: [
    { href: 'create', text: 'create account' },
    { href: 'login', text: 'login to existing' },
  ],
});
