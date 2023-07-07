export const emailAddressTable = `--sql
  CREATE TABLE IF NOT EXISTS email (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    userId INTEGER,
    emailAddedAt TEXT NOT NULL,
    isValidated INTEGER NOT NULL DEFAULT 0,
    validationToken TEXT,
    validationSentAt TEXT,
    validationExpiresAt TEXT,
    emailValidatedAt TEXT,
    isArchived INTEGER NOT NULL DEFAULT 0,
    archivedAt TEXT,
    
    FOREIGN KEY (userId) REFERENCES user(id)
  )
;`;
