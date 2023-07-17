import { getCreateFormConfig } from '#express/forms/create.form.config.js';

export const getCreate = (req, res, _next) => {
  res.render(
    'web/form.html.view.pug',
    getCreateFormConfig(),
  );
};

export const postCreate = (req, res) => {
  const { context: { di }, } = req;
  const { userService: { create } } = di

  res.json(create(req.body, req))
};
