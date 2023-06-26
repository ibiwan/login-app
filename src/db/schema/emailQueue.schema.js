export const emailQueueTable = `--sql
  CREATE TABLE IF NOT EXISTS email_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emailId INTEGER NOT NULL,
    subject TEXT NOT NULL,
    templateName TEXT NOT NULL,
    templateData TEXT,
    queuedAt TEXT NOT NULL,
    lastAttemptAt TEXT,
    sentAt TEXT,
    wasSent INTEGER NOT NULL DEFAULT 0,
    numRetries INTEGER NOT NULL DEFAULT 0,
    isCanceled INTEGER NOT NULL DEFAULT 0,
    canceledAt TEXT,
    
    FOREIGN KEY (emailId) REFERENCES email_address(id)
  )
;`;

export const addEmailToQueue = `--sql
  INSERT INTO email_queue
    (emailId, subject, templateName, templateData, queuedAt)
    VALUES (@emailId, @subject, @templateName, @templateData, @queuedAt);
`;

export const getOldestPending = `--sql
  SELECT * FROM email_queue 
    WHERE wasSent = 0 
      AND isCanceled = 0
      AND ((lastAttemptAt IS NULL) OR (lastAttemptAt < @attemptFilterBy))
    ORDER BY lastAttemptAt ASC
    LIMIT 1;
`;

export const setAttemptedAt = `--sql
  UPDATE email_queue SET 
    lastAttemptAt = @lastAttemptAt
    WHERE id = @emailQueueId;
`;

export const setSuccessful = `--sql
  UPDATE email_queue SET 
    wasSent = 1,
    sentAt = @sentAt
    WHERE id = @emailQueueId;
`;

export const setFailed = `--sql
  UPDATE email_queue SET
    numRetries = numRetries + 1,
    lastAttemptAt = @lastAttemptAt,
    WHERE id = @emailQueueId;
`;

export const setCanceled = `--sql
  UPDATE email_queue
    isCanceled = 1,
    canceledAt = @canceledAt
    WHERE id = @emailQueueId;
`;
