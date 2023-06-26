import Database from 'better-sqlite3';

import {
  emailAddressTable,
} from '#db/schema/emailAddress.schema.js';

import {
  emailQueueTable,
} from '#db/schema/emailQueue.schema.js';

import {
  activeSessionIndex,
  sessionTable,
} from '#db/schema/session.schema.js';

import {
  userTable,
} from '#db/schema/user.schema.js';

export const makeDbService = (_di) => {
  const db = new Database('./user_auth.db');

  db.exec(userTable);
  db.exec(sessionTable);
  db.exec(emailQueueTable);
  db.exec(emailAddressTable);
  db.exec(activeSessionIndex);

  return { db };
};
