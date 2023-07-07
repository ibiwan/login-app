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
