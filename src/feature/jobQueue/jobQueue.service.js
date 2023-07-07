import { toJson } from '#util/json.fn.js';

export const makeJobQueueService = (di) => {
  const queueMessage = (
    emailId,
    subject,
    templateName,
    data,
  ) => {
    const {
      mailerRepo: { addEmailToQueue },
      dateTimeService: { isoNow },
    } = di;

    addEmailToQueue({
      emailId,
      subject,
      templateName,
      templateData: toJson(data),
      queuedAt: isoNow(),
    });
  };

  const checkQueue = async () => {
    const {
      mailerService: { dequeueSend },
      mailerRepo: { getOldestPending },
      dateTimeService: { isoNowPlusMinutes },

    } = di;

    const attemptFilterBy = isoNowPlusMinutes(-10);

    const emailInfo = getOldestPending({ attemptFilterBy });
    if (emailInfo) { dequeueSend(emailInfo); }
  };

  const setWasAttempted = (mailerId) => {
    const {
      mailerRepo: { setAttemptedAt },
      dateTimeService: { isoNow },
    } = di;

    setAttemptedAt({
      mailerId,
      lastAttemptAt: isoNow(),
    });
  };

  const setWasSuccessful = (mailerId) => {
    const {
      mailerRepo: { setSuccessful },
      dateTimeService: { isoNow },
    } = di;

    setSuccessful({
      mailerId,
      sentAt: isoNow(),
    });
  };

  const setWasFailed = (mailerId) => {
    const {
      mailerRepo: { setFailed },
      dateTimeService: { isoNow },
    } = di;

    setFailed({
      lastAttemptAt: isoNow(),
      mailerId,
    });
  };

  const { options: { jobQueue: jobQueueOptions } } = di

  const {
    poll = true
  } = jobQueueOptions ?? {};

  if (poll) {
    setInterval(checkQueue, 10000);
  }

  return {
    queueMessage,
    setWasAttempted,
    setWasSuccessful,
    setWasFailed,
  };
};
