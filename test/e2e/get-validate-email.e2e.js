import request from 'supertest'
import { parse } from 'cookie';
import awilix from 'awilix';

import { passwordUrl } from '#express/handlers/password.handler.js';

import { selectSessionByKey } from '#feature/session/sql/session.select.js';
import { selectEmailByEmailAddress } from '#feature/email/sql/email.select.js';
import { selectUserById } from '#feature/user/sql/user.select.js';

import { makeTestApp } from '../mocks/test.app.js';
import { makeUserMatcherWith } from '../models/user.test.matcher.js';
import { makeSessionMatcherWith } from '../models/session.test.matcher.js';
import { makeEmailMatcherWith } from '../models/email.test.matcher.js';
import { makeCookieMatcherWith } from '../models/cookie.test.matcher.js';

const now = new Date('2020-01-01T00:00:00.000Z');
const email = 'test@gmail.test';
const emailAddedAt = now.toISOString();

const yesterday = new Date(now)
yesterday.setDate(yesterday.getDate() - 1)

const inFifteen = new Date(now)
inFifteen.setMinutes(inFifteen.getMinutes() + 15)

const validationToken = '3b69b4ad-cf66-404c-9ad3-5c99cdc3fded';
const validationEmailSentAt = yesterday.toISOString()
const validationExpiresAt = inFifteen.toISOString()

const cookieExpiresAt = inFifteen.toUTCString()

const sessionCreatedAt = now.toISOString()
const sessionExpiresAt = inFifteen.toISOString()
const sessionKey = '70c953c6-1baa-11ee-be56-0242ac120002';

const makeValidateTest = async (overrides = {}) => {
  const useOptions = {
    preload: {
      emailAddress: [{
        email,
        emailAddedAt,
        validationToken,
        validationExpiresAt,
        validationEmailSentAt,
      }],
    },
    overrideRegistrations: {
      cryptoService: awilix.asValue({
        randomUUID: () => sessionKey
      }),
      dateTimeService: awilix.asValue({
        isoNow: () => emailAddedAt,
        isoNowPlusMinutes: () => validationExpiresAt,
        nowPlusMinutes: () => inFifteen,
      }),
    },
    ...overrides
  };
  const { app, dbService } = makeTestApp(useOptions)

  const response = await request(app)
    .get(`/validate/${validationToken}`)

  return { response, dbService }
}

describe('GET /validate, success', () => {
  let response;
  let dbService;

  beforeAll(async () => {
    ({ response, dbService } = await makeValidateTest());
  })

  it('should redirect to the password form', async () => {
    expect(response.status).toEqual(302); // HTTP Redirect
    expect(response.headers.location).toEqual(passwordUrl)
  })

  it('should create a temp session in db', () => {
    const { db } = dbService;
    const sessionDetails = db.prepare(selectSessionByKey)
      .get({ sessionKey });

    expect(sessionDetails).toEqual(
      makeSessionMatcherWith({
        sessionKey,
        createdAt: sessionCreatedAt,
        expiresAt: sessionExpiresAt,
      })
    )
  })

  it('should return a cookie header with temp session', () => {
    const cookieHeaders = response.headers['set-cookie']
    const cookies = cookieHeaders.map(parse)
    const cookie = cookies[0]
    expect(cookie).toEqual(makeCookieMatcherWith({
      passwordSession: JSON.stringify({
        sessionKey,
        email,
      }),
      Expires: cookieExpiresAt,
    }))
  })

  it('should update email with validation and a user', async () => {
    const { db } = dbService;

    const emailDetails = db.prepare(selectEmailByEmailAddress)
      .get({ email })

    expect(emailDetails).toEqual(makeEmailMatcherWith({
      email,
      emailAddedAt,
      validationSentAt: validationEmailSentAt,
      emailValidatedAt: emailAddedAt,
    }))

    const userId = emailDetails.userId
    const userDetails = db.prepare(selectUserById).get({ userId })

    expect(userDetails).toEqual(makeUserMatcherWith({
      createdAt: emailAddedAt,
    }))
  });
});

describe('GET /validate, fail', () => {
  describe('validation token not in db', () => {

    let response;

    beforeAll(async () => {
      ({ response } = await makeValidateTest({
        preload: []
      }));

    })

    it('should redirect to the password form', async () => {
      expect(response.status).toEqual(302); // HTTP Redirect
      expect(response.headers.location).toEqual(passwordUrl)
    })

  });
  // issues:
  //    • no email in db for token
  //    • email can't be updated (race/lock/ref)
  // user already exists:
  // |    • user is invalid for some reason
  // user does not exist:
  // |    • user cannot by created for some reason
  //    • user can't be associated to email
  //    • password (temp) session can't be created
  //    • session cookie can't be created
  //    • session cookie can't be set
  //    • redirect can't be accomplished
});
