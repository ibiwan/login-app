import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { urlMiddleware } from '#express/middleware/url.mw.js';
import { initView } from '#express/middleware/views.mw.js';
import { router } from '#express/routes/routes.js';
import { makeContainer } from '#service/di.js';
import {
  nonfatalErrorCookieMiddleware,
  fatalErrorCookieMiddleware,
} from '#feature/cookie/errorCookie.mw.js';

export const makeApp = (options = {}) => {
  const { diMiddleware, dbService } = makeContainer(options)

  const { app: appOptions = {} } = options
  const { startListener = true } = appOptions

  const app = express();

  initView(app);

  app.use(
    express.static('public'),
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    bodyParser.text(),
    bodyParser.raw(),
    cookieParser(),
    function (req, res, next) {
      // @ts-ignore
      req.context = {
        // @ts-ignore
        ...req.context,
        callId: Math.floor(Math.random() * 100)
      }
      next()
    },
    urlMiddleware,
    diMiddleware,

    nonfatalErrorCookieMiddleware,
    router,
    fatalErrorCookieMiddleware,
  );

  if (startListener) {
    const port = process.env.PORT;

    app.listen(port, () => {
      console.info(`listening on port ${port}`);
    });
  }

  return { app, dbService };
}
