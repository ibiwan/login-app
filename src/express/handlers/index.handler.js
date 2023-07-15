export const getIndex = (req, res) =>
  res.render('web/index.html.view.pug', {
    links: [
      { href: 'login', text: 'login to existing' },
      { href: 'forgot', text: 'forgot password' },
      { href: 'create', text: 'create account' },
    ],
  });
