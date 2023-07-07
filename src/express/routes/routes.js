import express from 'express';

import { getSuccess } from '#express/handlers/success.handler.js';
import { getIndex } from '#express/handlers/index.handler.js';
import { getHome } from '#express/handlers/home.handler.js';

import {
  getValidateEmail,
} from '#express/handlers/validate.handler.js';

import {
  getValidateReset,
} from '#express/handlers/reset.handler.js';

import {
  getPassword,
  postPassword,
} from '#express/handlers/password.handler.js';

import {
  getCreate,
  postCreate,
} from '#feature/user/create.handler.js';

import {
  getForgot,
  postForgot,
} from '#feature/password/forgot.handler.js';

import {
  getLogin,
  postLogin,
} from '#feature/session/login.handler.js';

export const router = express.Router();

router.get('/', getIndex);
router.get('/home', getHome);
router.get('/success', getSuccess);
router.get('/reset/:passwordResetToken', getValidateReset);
router.get('/validate/:emailValidationToken', getValidateEmail);

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/create', getCreate);
router.post('/create', postCreate);

router.get('/forgot', getForgot);
router.post('/forgot', postForgot);

router.get('/password', getPassword);
router.post('/password', postPassword);
