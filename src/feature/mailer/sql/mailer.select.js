export const selectOldestPending = `--sql
  SELECT * FROM mailer 
    WHERE wasSent = 0 
      AND isCanceled = 0
      AND ((lastAttemptAt IS NULL) OR (lastAttemptAt < @attemptFilterBy))
    ORDER BY lastAttemptAt ASC
    LIMIT 1;
`;

export const selectByEmailId = `--sql
  SELECT * FROM mailer
    WHERE emailId = @emailId;
`