import Database from 'better-sqlite3';

import {
  activeSessionIndex,
  sessionTable,
} from '#feature/session/sql/session.schema.js';

import {
  mailerTable,
} from '#feature/mailer/sql/mailer.schema.js';

import {
  emailAddressTable,
} from '#feature/email/sql/email.schema.js';

import {
  userTable,
} from '#feature/user/sql/user.schema.js';
import { preloadData } from '#service/preload.service.js';

export const makeDbService = (di) => {
  const { options, options: { db: dbOptions } } = di

  const {
    useInMemory = false
  } = dbOptions ?? {};

  const dbPath = useInMemory ? ':memory:' : './user_auth.db'
  const db = new Database(dbPath);

  db.exec(emailAddressTable);
  db.exec(sessionTable);
  db.exec(mailerTable);
  db.exec(userTable);

  db.exec(activeSessionIndex);

  try {
    preloadData(options, db)
  } catch (err) {
    console.log('Error Preloading Data', { err })
  }

  return { db };
};
