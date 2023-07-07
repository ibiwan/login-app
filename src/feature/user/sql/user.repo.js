import {
  selectUserByPasswordToken,
  selectUserByDisplayName,
  selectUserByEmail,
  selectUserById,
} from './user.select.js'

import {
  setAndSendPasswordToken,
  setPasswordTokenSent,
  setIsArchived,
  setIsInvalid,
  setPasshash,
  setIsValid,
} from './user.update.js'

import {
  insertUserWithPassword,
  insertAdminUser,
  insertUser,
} from './user.insert.js'

export const makeUserRepo = (di) => {
  const { dbService: { db } } = di

  return {
    /** @param {{createdAt}} data */
    createUser: (data) => db.prepare(insertUser).run(data),
    /** @param {{createdAt, passhash}} data */
    createUserWithPassword: (data) => db.prepare(insertUserWithPassword).run(data),
    /** @param {{email, createdAt, passwordToken}} data */
    createAdminUser: (data) => db.prepare(insertAdminUser).run(data),

    /** @param {{displayName}} data */
    getUserByDisplayName: (data) => db.prepare(selectUserByDisplayName).get(data),
    /** @param {{userId}} data */
    getUserById: (data) => db.prepare(selectUserById).get(data),
    /** @param {{email}} data */
    getUserByEmail: (data) => db.prepare(selectUserByEmail).get(data),
    /** @param {{passwordToken}} data */
    getUserByPasswordToken: (data) => db.prepare(selectUserByPasswordToken).get(data),

    /** @param {{passwordTokenSentAt, userId}} data */
    setPasswordTokenSent: (data) => db.prepare(setPasswordTokenSent).run(data),
    /** @param {{passwordToken, passwordTokenSentAt, userId}} data */
    setAndSendPasswordToken: (data) => db.prepare(setAndSendPasswordToken).run(data),
    /** @param {{passhash, passhashSetAt, userId}} data */
    setPasshash: (data) => db.prepare(setPasshash).run(data),
    /** @param {{userId}} data */
    setIsValid: (data) => db.prepare(setIsValid).run(data),
    /** @param {{userId}} data */
    setIsInvalid: (data) => db.prepare(setIsInvalid).run(data),
    /** @param {{archivedAt, userId}} data */
    setIsArchived: (data) => db.prepare(setIsArchived).run(data),
  }
}
