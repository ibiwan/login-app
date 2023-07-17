import express from 'express';

import { getValidateEmail } from '#express/handlers/validate.handler.js';
import { getValidateReset } from '#express/handlers/reset.handler.js';
import { useSessionCookie } from '#express/middleware/session.mw.js';
import { getIndex } from '#express/handlers/index.handler.js';
import { getHome } from '#express/handlers/home.handler.js';
import { getLogout } from '#feature/session/logout.handler.js';

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
router.get('/home', useSessionCookie(true), getHome);
router.get('/reset/:passwordResetToken', getValidateReset);
router.get('/validate/:emailValidationToken', getValidateEmail);
router.get('/login', getLogin);
router.get('/logout', useSessionCookie(false), getLogout);
router.get('/create', getCreate);
router.get('/forgot', getForgot);
router.get('/password', useSessionCookie(false), getPassword);

router.post('/create', postCreate);
router.post('/forgot', postForgot);
router.post('/login', postLogin);
router.post('/password', useSessionCookie(false), postPassword);
