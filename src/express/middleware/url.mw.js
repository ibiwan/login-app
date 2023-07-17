import url from 'url'

export const urlMiddleware = (req, _res, next) => {
  req.context = {
    ...req.context,
    baseUrl: url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: '/',
    })
  }

  next();
};

export const makeValidateTokenUrl = (baseUrl, token) => {
  return new URL(`validate/${token}`, baseUrl);
}
