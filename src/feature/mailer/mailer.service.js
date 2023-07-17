import { renderTemplate } from '#express/views/template.fn.js';

const fromName = process.env.EMAIL_SEND_NAME;
const fromEmail = process.env.EMAIL_SEND_ADDR;

export const makeMailerService = (di) => {
  const send = async (
    recipient,
    subject,
    htmlBody,
  ) => {
    const { httpService: { post } } = di

    const result = await post(
      `${process.env.EMAIL_API_URL}smtp/email`,
      {
        sender: {
          name: fromName,
          email: fromEmail,
        },
        to: [{ email: recipient }],
        subject,
        htmlContent: htmlBody,
      },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.EMAIL_API_KEY,
        },
      },
    );
    const { status, data } = result;

    if (status !== 201) {
      console.error(
        'email api response code:',
        status,
      );
      return false;
    }

    console.debug(
      'Message sent:',
      data.messageId,
    );

    return true;
  };

  const dequeueSend = async ({
    id: mailerId,
    emailId,
    subject,
    templateName,
    templateData,
  }) => {
    const {
      jobQueueService: { setWasAttempted, setWasFailed, setWasSuccessful },
      emailRepo: { getEmailByEmailId, },
      emailService: { setValidationEmailSentAt },
    } = di;

    setWasAttempted(mailerId);

    const email = getEmailByEmailId({ emailId });

    const success = await send(
      email.email,
      subject,
      renderTemplate(templateName, templateData),
    );

    if (success) {
      setWasSuccessful(mailerId);
      setValidationEmailSentAt({ emailId })
    } else {
      setWasFailed(mailerId);
    }
  };

  return {
    send,
    dequeueSend,
  };
};
