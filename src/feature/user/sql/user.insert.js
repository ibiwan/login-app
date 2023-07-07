export const insertUser = `--sql
  INSERT INTO user
    (createdAt)
    VALUES (@createdAt);
`;

export const insertUserWithPassword = `--sql
  INSERT INTO user 
    (createdAt, passhash, passhashSetAt) 
    VALUES (@createdAt, @passhash, @createdAt);
`;

export const insertAdminUser = `--sql
  INSERT INTO user 
    (email, createdAt, passwordToken, isAdmin) 
    VALUES (@email, @createdAt, @passwordToken, true);
`;
