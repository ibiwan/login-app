import request from 'supertest'
import { load as loadHtml } from 'cheerio'

import { makeTestApp } from '../../mocks/test.app.js';

describe('GET /index', () => {
  let $

  beforeAll(async () => {
    const {app, dbService} = makeTestApp({})

    const response = await request(app).get(`/`)
    $ = loadHtml(response.text)
  })

  it(
    'renders buttons for other actions',
    () => {
      expect(
        $('a[href="create"]')
          .find('button')
          .length
      ).toBe(1)

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
