export const selectSessionByKey = `--sql
  SELECT * FROM session 
    WHERE sessionKey = @sessionKey
    AND isValid = 1;
`;
