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
