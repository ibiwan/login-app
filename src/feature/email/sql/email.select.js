export const selectEmailByEmailId = `--sql
  SELECT * FROM email 
    WHERE id = @emailId
      AND isArchived = 0;
;`;

export const selectEmailByEmailAddress = `--sql
  SELECT * FROM email 
    WHERE email = @email
      AND isArchived = 0;
;`;

export const selectValidEmailByUserId = `--sql
  SELECT * FROM email 
    WHERE userId = @userId
      AND isArchived = 0
      AND isValidated = 1;
;`;

export const selectEmailByToken = `--sql
  SELECT * FROM email 
    WHERE validationToken = @validationToken
      AND isArchived = 0;
;`;
