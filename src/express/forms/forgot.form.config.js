export const getForgotFormConfig = () =>
({
  formTitle: 'Forgot Password',
  submitLabel: 'Send Reset Link',
  action: 'forgot',
  inputs: [
    {
      name: 'email',
      type: 'text',
      autocomplete: 'email',
    },
  ],
  links: [
    { href: 'create', text: 'create account' },
    { href: 'login', text: 'login to existing' },
  ],
});
