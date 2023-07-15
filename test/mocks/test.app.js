import { makeApp } from '#express/app.js'

export const makeTestApp = ({
  app = null,
  db = null,
  preload = null,
  overrideRegistrations = null,
}) => {
  return makeApp({
    app: {
      startListener: false,
      ...app,
    },
    db: {
      useInMemory: true,
      ...db,
    },
    preload: {
      ...preload,
    },
    overrideRegistrations: {
      ...overrideRegistrations,
    },
  })
}