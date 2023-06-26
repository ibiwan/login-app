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

export const createSession = `--sql
  INSERT INTO session 
    (sessionKey, userId, createdAt, expiresAt) 
    VALUES (@sessionKey, @userId, @createdAt, @expiresAt);
`;

export const invalidateSessionByKey = `--sql
  UPDATE session
    SET isValid = 0, invalidatedAt = @invalidatedAt
    WHERE sessionKey = @sessionKey;
`;

export const invalidateSessionsByUser = `--sql
  UPDATE session
    SET isValid = 0, invalidatedAt = @invalidatedAt
    WHERE userId = @userId;
`;
