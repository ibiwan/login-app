import * as url from 'url';

import { camelize, titleize } from '#util/string.fn.js';

export const __dirname = url.fileURLToPath(
  new URL('../views', import.meta.url)
);

export const initView = (app) => {
  app.locals.titleize = titleize;
  app.locals.camelize = camelize;

  app.set('view engine', 'pug');
  app.set('views', __dirname);
};
