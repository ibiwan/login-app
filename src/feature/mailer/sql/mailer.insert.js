export const insertEmailToQueue = `--sql
  INSERT INTO mailer
    (emailId, subject, templateName, templateData, queuedAt)
    VALUES (@emailId, @subject, @templateName, @templateData, @queuedAt);
`;
