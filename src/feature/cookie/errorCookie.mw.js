export class FatalError extends Error { }

export const nonfatalErrorCookieMiddleware = async (req, res, next) => {
  await next();
}

export const fatalErrorCookieMiddleware = async (err, req, res, next) => {
  const {
    di: {
      errorService: { getErrors },
    }
  } = req.context;
  
  console.error({err, getErrors})
  res.json({
    success: false,
    errors: [
      ...getErrors(),
      err.message,
    ]
  })
}
