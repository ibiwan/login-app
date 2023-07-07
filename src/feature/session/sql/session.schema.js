export const sessionTable = `--sql
  CREATE TABLE IF NOT EXISTS session (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sessionKey TEXT UNIQUE NOT NULL,
    userId INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    expiresAt TEXT NOT NULL,
    isValid INTEGER NOT NULL DEFAULT 1,
    invalidatedAt TEXT,

    FOREIGN KEY (userId) REFERENCES user(id)
  );
`;

export const activeSessionIndex = `--sql
  CREATE INDEX IF NOT EXISTS activeSessionUserIdIndex 
    ON session(userId) WHERE isValid = 1;
`;
