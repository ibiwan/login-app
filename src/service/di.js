import awilix from 'awilix';
import crypto from 'crypto';
import axios from 'axios';

import { makeDbService } from '#service/db.service.js';
import { makeErrorService } from '#service/error.service.js';
import { makePreloadService } from '#service/preload.service.js';
import { makeDateTimeService } from '#service/dateTime.service.js';
import { makeCookieService } from '#feature/cookie/cookie.service.js';
import { makeValidationService } from '#service/validation.service.js';

import { makeEmailRepo } from '#feature/email/sql/email.repo.js';
import { makeEmailService } from '#feature/email/email.service.js';

import { makeJobQueueService } from '#feature/jobQueue/jobQueue.service.js';

import { makeMailerRepo } from '#feature/mailer/sql/mailer.repo.js';
import { makeMailerService } from '#feature/mailer/mailer.service.js';

import { makeRoleRepo } from '#feature/role/sql/role.repo.js';

import { makePasswordService } from '#feature/password/password.service.js';

import { makeSessionRepo } from '#feature/session/sql/session.repo.js';
import { makeSessionService } from '#feature/session/session.service.js';

import { makeUserRepo } from '#feature/user/sql/user.repo.js';
import { makeUserService } from '#feature/user/user.service.js';

export const makeContainer = (options = {}) => {
  const {
    overridePermRegistrations = {},
    overrideReqRegistrations = {},
  } = options;

  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
  });

  const permRegistrations = {
    jobQueueService: awilix.asFunction(makeJobQueueService).singleton(),

    sessionRepo: awilix.asFunction(makeSessionRepo).singleton(),
    mailerRepo: awilix.asFunction(makeMailerRepo).singleton(),
    emailRepo: awilix.asFunction(makeEmailRepo).singleton(),
    userRepo: awilix.asFunction(makeUserRepo).singleton(),
    roleRepo: awilix.asFunction(makeRoleRepo).singleton(),

    dateTimeService: awilix.asFunction(makeDateTimeService).singleton(),
    mailerService: awilix.asFunction(makeMailerService).singleton(),
    cookieService: awilix.asFunction(makeCookieService).singleton(),
    dbService: awilix.asFunction(makeDbService).singleton(),
    httpService: awilix.asValue(axios),
    cryptoService: awilix.asValue(crypto),
    options: awilix.asValue(options),
  }

  const reqRegistrations = {
    passwordService: awilix.asFunction(makePasswordService).scoped(),
    sessionService: awilix.asFunction(makeSessionService).scoped(),
    emailService: awilix.asFunction(makeEmailService).scoped(),
    userService: awilix.asFunction(makeUserService).scoped(),

    validationService: awilix.asFunction(makeValidationService).scoped(),
    preloadService: awilix.asFunction(makePreloadService).scoped(),
    errorService: awilix.asFunction(makeErrorService).scoped(),
  }

  container.register({
    ...permRegistrations,
    ...overridePermRegistrations,
  });

  const permDi = container.cradle;

  const diMiddleware = (req, _res, next) => {
    const reqScope = container.createScope()

    reqScope.register({
      ...reqRegistrations,
      ...overrideReqRegistrations
    })

    req.context.di = container.cradle;
    req.context.reqDi = reqScope.cradle;

    req.context.reqDi.preloadService; // access to preload data

    next();
  };

  return { diMiddleware, permDi }
};
