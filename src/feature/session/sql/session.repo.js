import { selectSessionByKey } from './session.select.js'
import { insertSession } from './session.insert.js'

import {
  invalidateSessionByKey,
  invalidateSessionsByUser,
} from './session.update.js'

export const makeSessionRepo = (di) => {
  const { dbService: { db } } = di

  return {
    /** @param {{sessionKey, userId, createdAt, expiresAt}} data */
    createSession: (data) => db.prepare(insertSession).run(data),

    /** @param {{sessionKey}} data */
    getSessionByKey: (data) => db.prepare(selectSessionByKey).get(data),

    /** @param {{invalidatedAt, sessionKey}} data */
    invalidateSessionByKey: (data) => db.prepare(invalidateSessionByKey).run(data),
    /** @param {{invalidatedAt, userId}} data */
    invalidateSessionsByUser: (data) => db.prepare(invalidateSessionsByUser).run(data),
  }
}
