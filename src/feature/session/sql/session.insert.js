export const insertSession = `--sql
  INSERT INTO session 
    (sessionKey, userId, createdAt, expiresAt) 
    VALUES (@sessionKey, @userId, @createdAt, @expiresAt);
`;
