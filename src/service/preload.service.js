export const makePreloadService = (di) => {
  const { options: { preload } } = di

  const prepopulateEmail = (emailsData) => {
    const { emailRepo: { createOrphanEmail, setValidationTokenSent } } = di;
    emailsData.forEach(emailData => {
      const { validationEmailSentAt, ...rest } = emailData
      const {lastInsertRowid:emailId} = createOrphanEmail(rest)
      
      if (validationEmailSentAt) {
        setValidationTokenSent({emailId, validationSentAt:validationEmailSentAt})
      }
    }
    )
  }

  const prepopulateData = (data) => {
    for (const [key, val] of Object.entries(data)) {
      switch (key) {
        case 'emailAddress':
          prepopulateEmail(val)
          break;
        default:
          throw `can't populate type: ${key}`
      }
    }
  }

  if (preload) { prepopulateData(preload) }

  return {}
}
