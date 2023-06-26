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

export const getUserByDisplayName = `--sql
  SELECT * FROM user 
    WHERE displayName = @displayName 
      AND isArchived = 0;
`;

export const getUserById = `--sql
  SELECT * FROM user 
    WHERE id = @userId
      AND isArchived = 0;
`;

export const getUserByEmail = `--sql
  SELECT u.* FROM user u
    LEFT JOIN email_address e on u.id = e.userId
    WHERE u.isArchived = 0 
      AND e.email = @email 
      AND e.isArchived = 0;
`;

export const getUserByPasswordToken = `--sql
  SELECT * FROM user 
    WHERE passwordToken = @passwordToken
      AND isArchived = 0;
`;

export const createUser = `--sql
  INSERT INTO user
    (createdAt)
    VALUES (@createdAt);
`;

export const createUserWithPassword = `--sql
  INSERT INTO user 
    (createdAt, passhash, passhashSetAt) 
    VALUES (@createdAt, @passhash, @createdAt);
`;

export const createAdminUser = `--sql
  INSERT INTO user 
    (email, createdAt, passwordToken, isAdmin) 
    VALUES (@email, @createdAt, @passwordToken, true);
`;

export const setPasswordTokenSent = `--sql
  UPDATE user 
    SET passwordTokenSentAt = @passwordTokenSentAt 
    WHERE id = @userId;
`;

export const setAndSendPasswordToken = `--sql
  UPDATE user 
    SET passwordToken = @passwordToken,
        passwordTokenSentAt = @passwordTokenSentAt 
    WHERE id = @userId;
`;

export const setPasshash = `--sql
  UPDATE user
    SET passwordToken = null,
        passwordTokenSentAt = null,
        passhash = @passhash,
        passhashSetAt = @passhashSetAt
    WHERE id = @userId;
`;

export const setIsValid = `--sql
  UPDATE user
    SET isValid = 1
    WHERE id = @userId;
`;

export const setIsInvalid = `--sql
  UPDATE user
    SET isValid = 0
    WHERE id = @userId;
`;

export const setIsArchived = `--sql
  UPDATE user
    SET isArchived = 1, 
        archivedAt = @archivedAt
    WHERE id = @userId;
`;
