export const makeCookieMatcherWith = (fields) => ({
  passwordSession: null,
  Path: "/",
  Expires: null,
  SameSite: 'Strict',

  ...fields
})