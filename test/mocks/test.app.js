import { makeApp } from '#express/app.js'

export const makeTestApp = ({
  app = null,
  db = null,
  preload = null,
  overridePermRegistrations = null,
  overrideReqRegistrations = null,
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
    overridePermRegistrations: {
      ...overridePermRegistrations,
    },
    overrideReqRegistrations: {
      ...overrideReqRegistrations,
    },
  })
}