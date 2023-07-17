export const getLogout = (req, res) => {
  const { di, sessionKey } = req.context;
  const { sessionService: { invalidateSession } } = di
  if (sessionKey) { invalidateSession(sessionKey) }
  
  res.redirect('/')
}
