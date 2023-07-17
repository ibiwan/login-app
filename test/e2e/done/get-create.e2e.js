import request from 'supertest'
import { load as loadHtml } from 'cheerio'

import { makeTestApp } from '../../mocks/test.app.js';

describe('GET /create without errors', () => {
  let $

  beforeAll(async () => {
    const {app, dbService} = makeTestApp({})

    const response = await request(app).get(`/create`)
    $ = loadHtml(response.text)
  })

  it(
    'renders form to enter email',
    () => {
      const formResults = $('form[action="create"]')

      expect(
        formResults.length
      ).toBe(1)

      expect(
        formResults
          .find('input[type="text"][name="email"]')
          .length
      ).toBe(1)

      expect(
        formResults
          .find('input[type="submit"]')
          .length
      ).toBe(1)
    })

  it(
    'renders buttons for other actions',
    () => {
      expect(
        $('a[href="login"]')
          .find('button')
          .length
      ).toBe(1)

      expect(
        $('a[href="forgot"]')
          .find('button')
          .length
      ).toBe(1)
    })
});


describe('GET /create with form errors', () => {
  let $
  const formLevelError = 'A FORM-LEVEL ERROR'
  const emailFieldError = 'AN EMAIL FIELD ERROR'

  beforeAll(async () => {
    const {app, dbService} = makeTestApp({})

    const cookieBodyJson = encodeURIComponent(JSON.stringify({
      formErrors: [formLevelError],
      emailErrors: [emailFieldError],
    }))

    const response = await request(app)
      .get(`/create`)
      .set('Cookie', [`${cookieName}=${cookieBodyJson}`])
    $ = loadHtml(response.text)
  })

  it(
    'renders form to enter email, with errors displayed',
    () => {
      expect(
        $('body>div.error')
          .text()
      ).toBe(formLevelError)

      expect(
        $('label[for="email"]')
          .parent()
          .find('.error')
          .text()
      ).toBe(emailFieldError)
    })
});

//<body>
//   <div class="error">A FORM-LEVEL ERROR</div>
//   <form action="create" method="post">
//      <div class="formGrid">
//         <label for="email">Email:</label>
//         <div class="formItem">
//            <div class="error">A FIELD-LEVEL ERROR</div>
//            <input type="text" id="email" name="email"/>
