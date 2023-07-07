export const makeEmailMatcherWith = (fields) => ({
  id: expect.any(Number),
  email: null,
  userId: expect.any(Number),
  emailAddedAt: null,
  isValidated: 1,
  validationToken: null,
  validationSentAt: null,
  emailValidatedAt: null,
  validationExpiresAt: null,
  isArchived: 0,
  archivedAt: null,

  ...fields
})