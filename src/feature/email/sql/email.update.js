export const setValidationTokenSent = `--sql
  UPDATE email 
    SET validationSentAt = @validationSentAt 
    WHERE id = @emailId;
`;

export const setAndSendValidationToken = `--sql
  UPDATE email 
    SET validationToken = @validationToken,
        validationSentAt = @validationSentAt,
        validationExpiresAt = @validationExpiresAt
    WHERE id = @emailId;
`;

export const setIsValidated = `--sql
  UPDATE email
    SET isValidated = 1,
        emailValidatedAt = @emailValidatedAt,
        validationToken = null,
        validationExpiresAt = null
    WHERE id = @emailId;
`;

export const setIsArchived = `--sql
  UPDATE email
    SET isArchived = 1, 
        archivedAt = @archivedAt
    WHERE id = @emailId;
`;

export const attachToUserId = `--sql
  UPDATE email
    SET userId=@userId
    WHERE id=@emailId
      AND isArchived = 0;
`;
