export const insertSession = `--sql
  INSERT INTO session 
    (sessionKey, userId, createdAt, expiresAt, isPassOnly) 
    VALUES (@sessionKey, @userId, @createdAt, @expiresAt, @isPassOnly);
`;
