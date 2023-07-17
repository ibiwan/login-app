import { fromJson } from '#util/json.fn.js';

export const extractCookie = (req, cookieName) => {
  const cookies = req?.cookies
  console.log({ cookies })
  const text = cookies?.[cookieName];
  const parsed = fromJson(text);
  return parsed
}
