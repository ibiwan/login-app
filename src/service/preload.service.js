import { makeEmailRepo } from '#feature/email/sql/email.repo.js';

export const preloadData = (options, db) => {
  const { preload } = options

  const prepopulateEmail = (emailsData) => {
    const { createOrphanEmail, setValidationTokenSent } = makeEmailRepo({ dbService: { db } })
    emailsData.forEach(emailData => {
      const { validationEmailSentAt, ...rest } = emailData
      const { lastInsertRowid: emailId } = createOrphanEmail(rest)

      if (validationEmailSentAt) {
        setValidationTokenSent({ emailId, validationSentAt: validationEmailSentAt })
      }
    }
    )
  }

  const prepopulateData = (data = {}) => {
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

  prepopulateData(preload)
}
