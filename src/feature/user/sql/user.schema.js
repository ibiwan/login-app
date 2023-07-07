export const userTable = `--sql
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    displayName TEXT UNIQUE,
    passhash TEXT,
    passhashSetAt TEXT,
    createdAt TEXT NOT NULL,
    isValid INTEGER NOT NULL DEFAULT 0,
    passwordToken TEXT UNIQUE,
    passwordTokenSentAt TEXT,
    isArchived INTEGER NOT NULL DEFAULT 0,
    archivedAt TEXT
  );
`;
