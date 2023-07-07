import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { errorCookieMiddleware } from '#feature/cookie/errorCookie.mw.js';
import { urlMiddleware } from '#express/middleware/url.mw.js';
import { initView } from '#express/middleware/views.mw.js';
import { router } from '#express/routes/routes.js';
import { makeContainer } from '#service/di.js';

export const makeApp = (options = {}) => {
  const { diMiddleware, permDi } = makeContainer(options)

  const { app: appOptions = {} } = options
  const { startListener = true } = appOptions

  const app = express();

  initView(app);

  const stdErrorMW = (err, _req, _res, next) => {
    console.error({ err })
    next(err)
  }

  app.use(
    express.static('public'),
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    bodyParser.text(),
    bodyParser.raw(),
    cookieParser(),
    urlMiddleware,
    diMiddleware,
    errorCookieMiddleware,
    // THEN the router
    router,
    stdErrorMW,
  );

  if (startListener) {
    const port = process.env.PORT;

    app.listen(port, () => {
      console.info(`listening on port ${port}`);
    });
  }

  return {app, permDi};
}
