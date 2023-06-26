import express from 'express';

import { getSuccess } from '#handlers/success.handler.js';
import { getIndex } from '#handlers/index.handler.js';
import { getHome } from '#handlers/home.handler.js';

import {
  getValidateEmail,
} from '#handlers/validate.handler.js';

import {
  getPassword,
  postPassword,
} from '#handlers/password.handler.js';

import {
  getCreate,
  postCreate,
} from '#handlers/create.handler.js';

import {
  getForgot,
  postForgot,
} from '#handlers/forgot.handler.js';

import {
  getLogin,
  postLogin,
} from '#handlers/login.handler.js';

export const router = express.Router();

router.get('/', getIndex);
router.get('/home', getHome);
router.get('/success', getSuccess);

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/create', getCreate);
router.post('/create', postCreate);
router.get('/validate/:emailValidationToken', getValidateEmail);

router.get('/forgot', getForgot);
router.post('/forgot', postForgot);

router.get('/password', getPassword);
router.post('/password', postPassword);
