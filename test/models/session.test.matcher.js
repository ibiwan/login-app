export const makeSessionMatcherWith = (fields) => ({
  id: expect.any(Number),
  sessionKey: null,
  userId: expect.any(Number),
  createdAt: null,
  expiresAt: null,
  isValid: 1,
  invalidatedAt: null,

...fields
})