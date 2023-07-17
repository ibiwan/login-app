export const getLoginFormConfig = () =>
({
  formTitle: 'Log In',
  submitLabel: 'Login',
  action: 'login',
  inputs: [
    {
      name: 'email',
      type: 'text',
      autocomplete: 'email',
    },
    {
      name: 'password',
      type: 'password',
      autocomplete: 'current-password',
    },
  ],
  links: [
    { href: 'create', text: 'create account' },
    { href: 'forgot', text: 'forgot password' },
  ],
});
