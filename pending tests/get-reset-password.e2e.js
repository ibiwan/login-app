import request from 'supertest'
import { parse } from 'cookie';
import awilix from 'awilix';

import { passwordUrl } from '#express/handlers/password.handler.js';

import { selectSessionByKey } from '#feature/session/sql/session.select.js';
import { selectEmailByEmailAddress } from '#feature/email/sql/email.select.js';
import { selectUserById } from '#feature/user/sql/user.select.js';

import { makeTestApp } from '../test/mocks/test.app.js';
import { makeUserMatcherWith } from '../test/models/user.test.matcher.js';
import { makeSessionMatcherWith } from '../test/models/session.test.matcher.js';
import { makeEmailMatcherWith } from '../test/models/email.test.matcher.js';
import { makeCookieMatcherWith } from '../test/models/cookie.test.matcher.js';

describe('GET /reset', () => {
  // const now = new Date('2020-01-01T00:00:00.000Z');
  // const email = 'test@gmail.test';
  // const emailAddedAt = now.toISOString();

  // const yesterday = new Date(now)
  // yesterday.setDate(yesterday.getDate() - 1)

  // const inFifteen = new Date(now)
  // inFifteen.setMinutes(inFifteen.getMinutes() + 15)

  const resetToken = '6c9e250a-e309-4c2f-b99b-abf87c414269';
  // const validationEmailSentAt = yesterday.toISOString()
  // const validationExpiresAt = inFifteen.toISOString()

  // const cookieExpiresAt = inFifteen.toUTCString()

  // const sessionCreatedAt = now.toISOString()
  // const sessionExpiresAt = inFifteen.toISOString()
  // const sessionKey = '70c953c6-1baa-11ee-be56-0242ac120002';

  let response
  // let di

  beforeAll(async () => {
    const { app, dbService } = makeTestApp({
      preload: {
        // emailAddress: [{
        // email,
        // emailAddedAt,
        // validationToken,
        // validationExpiresAt,
        // validationEmailSentAt,
        // }],
      },
      overrideRegistrations: {
        // cryptoService: awilix.asValue({
        //   randomUUID: () => sessionKey
        // }),
        // dateTimeService: awilix.asValue({
        //   isoNow: () => emailAddedAt,
        //   isoNowPlusMinutes: () => validationExpiresAt,
        //   nowPlusMinutes: () => inFifteen,
        // }),
      }
    })

    // di = permDi

    response = await request(app)
      .get(`/reset/${resetToken}`)
  })

  it('a', () => {
    expect(true)
      .toBe(true)
  })

  // it('should redirect to the password form', async () => {
  //   expect(response.status).toEqual(302); // HTTP Redirect
  //   expect(response.headers.location).toEqual(passwordUrl)
  // })

  // it('should create a temp session in db', () => {
  //   const { dbService: { db } } = di;
  //   const sessionDetails = db.prepare(selectSessionByKey).get({ sessionKey });

  //   expect(sessionDetails).toEqual(
  //     makeSessionMatcherWith({
  //       sessionKey,
  //       createdAt: sessionCreatedAt,
  //       expiresAt: sessionExpiresAt,
  //     })
  //   )
  // })

  // it('should return a cookie header with temp session', () => {
  //   const cookieHeaders = response.headers['set-cookie']
  //   const cookies = cookieHeaders.map(parse)
  //   const cookie = cookies[0]
  //   expect(cookie).toEqual(makeCookieMatcherWith({
  //     passwordSession: JSON.stringify({
  //       sessionKey,
  //       email,
  //     }),
  //     Expires: cookieExpiresAt,
  //   }))
  // })

  // it('should update email with validation and a user', async () => {
  //   const { dbService: { db } } = di;
  //   const emailDetails = db.prepare(selectEmailByEmailAddress).get({ email })

  //   expect(emailDetails).toEqual(makeEmailMatcherWith({
  //     email,
  //     emailAddedAt,
  //     validationSentAt: validationEmailSentAt,
  //     emailValidatedAt: emailAddedAt,
  //   }))

  //   const userId = emailDetails.userId
  //   const userDetails = db.prepare(selectUserById).get({ userId })

  //   expect(userDetails).toEqual(makeUserMatcherWith({
  //     createdAt: emailAddedAt,
  //   }))
  // });
});
