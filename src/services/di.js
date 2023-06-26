import { makeDbService } from '#services/db.service.js';
import { makeEmailService } from '#services/email.service.js';
import { makeUserService } from '#services/user.service.js';
import awilix from 'awilix';

const makeContainer = () => {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
  });

  container.register({
    dbService: awilix.asFunction(makeDbService).singleton(),
    emailService: awilix.asFunction(makeEmailService).singleton(),
    userService: awilix.asFunction(makeUserService).singleton(),
  });

  return container;
};

const container = makeContainer();

// initialize queue consumer
const _s = container.cradle.emailService;

export const diMiddleware = (req, _res, next) => {
  req.context = { ...req.context, di: container.cradle };

  next();
};
