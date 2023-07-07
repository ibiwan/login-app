export const selectUserByDisplayName = `--sql
  SELECT * FROM user 
    WHERE displayName = @displayName 
      AND isArchived = 0;
`;

export const selectUserById = `--sql
  SELECT * FROM user 
    WHERE id = @userId
      AND isArchived = 0;
`;

export const selectUserByEmail = `--sql
  SELECT u.* FROM user u
    LEFT JOIN email e on u.id = e.userId
    WHERE u.isArchived = 0 
      AND e.email = @email 
      AND e.isArchived = 0;
`;

export const selectUserByPasswordToken = `--sql
  SELECT * FROM user 
    WHERE passwordToken = @passwordToken
      AND isArchived = 0;
`;
