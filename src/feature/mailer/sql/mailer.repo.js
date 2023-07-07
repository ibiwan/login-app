import { selectByEmailId, selectOldestPending } from './mailer.select.js'
import { insertEmailToQueue } from './mailer.insert.js'

import {
  setAttemptedAt,
  setCanceled,
  setFailed,
  setSuccessful,
} from './mailer.update.js'

export const makeMailerRepo = (di) => {
  const { dbService: { db } } = di

  return {
    /** @param {{emailId, subject, templateName, templateData, queuedAt}} data */
    addEmailToQueue: (data) => db.prepare(insertEmailToQueue).run(data),

    /** @param {{emailId}} data*/
    getByEmailId: (data) => db.prepare(selectByEmailId).all(data),
    /** @param {{attemptFilterBy}} data */
    getOldestPending: (data) => db.prepare(selectOldestPending).get(data),

    /** @param {{lastAttemptAt, mailerId}} data */
    setAttemptedAt: (data) => db.prepare(setAttemptedAt).run(data),
    /** @param {{sentAt, mailerId}} data */
    setSuccessful: (data) => db.prepare(setSuccessful).run(data),
    /** @param {{lastAttemptAt, mailerId}} data */
    setFailed: (data) => db.prepare(setFailed).run(data),
    /** @param {{canceledAt, mailerId}} data */
    setCanceled: (data) => db.prepare(setCanceled).run(data),
  }
}
