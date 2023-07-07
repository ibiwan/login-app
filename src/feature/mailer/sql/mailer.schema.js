export const mailerTable = `--sql
  CREATE TABLE IF NOT EXISTS mailer (
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
    
    FOREIGN KEY (emailId) REFERENCES email(id)
  )
;`;
