export const emailAddressTable = `--sql
  CREATE TABLE IF NOT EXISTS email_address (
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

export const getEmailByEmailId = `--sql
  SELECT * FROM email_address 
    WHERE id = @emailId
      AND isArchived = 0;
;`;

export const getEmailByEmail = `--sql
  SELECT * FROM email_address 
    WHERE email = @email
      AND isArchived = 0;
;`;

export const getEmailByUserId = `--sql
  SELECT * FROM email_address 
    WHERE userId = @userId
      AND isArchived = 0;
;`;

export const getEmailByToken = `--sql
  SELECT * FROM email_address 
    WHERE validationToken = @validationToken
      AND isArchived = 0;
;`;

export const createEmail = `--sql
  INSERT INTO email_address
    (
      userId, email, emailAddedAt, 
      validationToken, validationExpiresAt
    )
    VALUES (
      @userId, @email, @emailAddedAt, 
      @validationToken, @validationExpiresAt
    );
`;

export const createOrphanEmail = `--sql
  INSERT INTO email_address
    (
      email, emailAddedAt, 
      validationToken, validationExpiresAt
    )
    VALUES (
      @email, @emailAddedAt, 
      @validationToken, @validationExpiresAt
    );
`;

export const createValidatedEmail = `--sql
  INSERT INTO email_address
    (userId, email, emailAddedAt, isValidated)
    VALUES (@userId, @email, @emailAddedAt, 1);
`;

export const setValidationTokenSent = `--sql
  UPDATE email_address 
    SET validationSentAt = @validationSentAt 
    WHERE id = @emailId;
`;

export const setAndSendValidationToken = `--sql
  UPDATE email_address 
    SET validationToken = @validationToken,
        validationSentAt = @validationSentAt,
        validationExpiresAt=@validationExpiresAt
    WHERE id = @emailId;
`;

export const setIsValidated = `--sql
  UPDATE email_address
    SET isValidated = 1,
        emailValidatedAt = @emailValidatedAt,
        validationToken = null,
        validationExpiresAt = null
    WHERE id = @emailId;
`;

export const setIsArchived = `--sql
  UPDATE email_address
    SET isArchived = 1, 
        archivedAt = @archivedAt
    WHERE id = @emailId;
`;

export const attachToUserId = `--sql
  UPDATE email_address
    SET userId=@userId
    WHERE id=@emailId
      AND isArchived = 0;
`;
