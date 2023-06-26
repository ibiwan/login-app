import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { diMiddleware } from '#services/di.js';
import { router } from '#routes/routes.js';
import { initView } from '#views/init.js';

// dotenv.config();

const app = express();

app.use(express.static('public'));

initView(app);

app.use(
  cors(),
  bodyParser.json(),
  bodyParser.raw(),
  bodyParser.text(),
  bodyParser.urlencoded({ extended: true }),
  cookieParser(),
  diMiddleware,
);

app.use(router);

const port = 3000;
app.listen(port, () => {
  console.info(`listening on port ${port}`);
});
