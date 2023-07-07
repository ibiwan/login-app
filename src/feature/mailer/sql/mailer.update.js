export const setAttemptedAt = `--sql
  UPDATE mailer SET 
    lastAttemptAt = @lastAttemptAt
    WHERE id = @mailerId;
`;

export const setSuccessful = `--sql
  UPDATE mailer SET 
    wasSent = 1,
    sentAt = @sentAt
    WHERE id = @mailerId;
`;

export const setFailed = `--sql
  UPDATE mailer SET
    numRetries = numRetries + 1,
    lastAttemptAt = @lastAttemptAt,
    WHERE id = @mailerId;
`;

export const setCanceled = `--sql
  UPDATE mailer
    isCanceled = 1,
    canceledAt = @canceledAt
    WHERE id = @mailerId;
`;
