export const getCreateFormConfig = () =>
({
  formTitle: 'Create Account',
  submitLabel: 'Create',
  action: 'create',
  inputs: [
    {
      name: 'email',
      type: 'text',
      autocomplete: 'email',
    },
  ],
  links: [
    { href: 'login', text: 'login to existing' },
    { href: 'forgot', text: 'forgot password' },
  ],
});
