import {
  selectEmailByEmailAddress,
  selectValidEmailByUserId,
  selectEmailByEmailId,
  selectEmailByToken,
} from './email.select.js'

import {
  insertValidatedEmail,
  insertOrphanEmail,
  insertEmail,
} from './email.insert.js'

import {
  setAndSendValidationToken,
  setValidationTokenSent,
  attachToUserId,
  setIsValidated,
  setIsArchived,
} from './email.update.js'

export const makeEmailRepo = (di) => {
  const { dbService: { db } } = di

  return {
    /** @param {{userId, email, emailAddedAt, validationToken, validationExpiresAt}} data */
    createEmail: (data) => db.prepare(insertEmail).run(data),
    /** @param {{email, emailAddedAt, validationToken, validationExpiresAt}} data */
    createOrphanEmail: (data) => db.prepare(insertOrphanEmail).run(data),
    /** @param {{userId, email, emailAddedAt}} data */
    createValidatedEmail: (data) => db.prepare(insertValidatedEmail).run(data),

    /** @param {{emailId}} data */
    getEmailByEmailId: (data) => db.prepare(selectEmailByEmailId).get(data),
    /** @param {{email}} data */
    getEmailByEmailAddress: (data) => db.prepare(selectEmailByEmailAddress).get(data),
    /** @param {{userId}} data */
    getValidEmailByUserId: (data) => db.prepare(selectValidEmailByUserId).get(data),
    /** @param {{validationToken}} data */
    getEmailByToken: (data) => db.prepare(selectEmailByToken).get(data),

    /** @param {{validationSentAt, emailId}} data */
    setValidationTokenSent: (data) => db.prepare(setValidationTokenSent).run(data),
    /** @param {{validationToken, validationSentAt, validationExpiresAt, emailId}} data */
    setAndSendValidationToken: (data) => db.prepare(setAndSendValidationToken).run(data),
    /** @param {{emailValidatedAt, emailId}} data */
    setIsValidated: (data) => db.prepare(setIsValidated).run(data),
    /** @param {{archivedAt, emailId}} data */
    setIsArchived: (data) => db.prepare(setIsArchived).run(data),
    /** @param {{userId, emailId}} data */
    attachToUserId: (data) => db.prepare(attachToUserId).run(data),
  }
}
