export const makeUserMatcherWith = (fields) => ({
  id: expect.any(Number),
  displayName: null,
  passhash: null,
  passhashSetAt: null,
  createdAt: null,
  isValid: 0,
  passwordToken: null,
  passwordTokenSentAt: null,
  isArchived: 0,
  archivedAt: null,

  ...fields
})