export const insertEmail = `--sql
  INSERT INTO email
    (
      userId, email, emailAddedAt, 
      validationToken, validationExpiresAt
    )
    VALUES (
      @userId, @email, @emailAddedAt, 
      @validationToken, @validationExpiresAt
    );
`;

export const insertOrphanEmail = `--sql
  INSERT INTO email
    (
      email, emailAddedAt, 
      validationToken, validationExpiresAt
    )
    VALUES (
      @email, @emailAddedAt, 
      @validationToken, @validationExpiresAt
    );
`;

export const insertValidatedEmail = `--sql
  INSERT INTO email
    (userId, email, emailAddedAt, isValidated)
    VALUES (@userId, @email, @emailAddedAt, 1);
`;
