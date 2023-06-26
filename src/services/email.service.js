import axios from 'axios';
import path from 'path';
import pug from 'pug';

import { getEmailByEmailId } from '#db/schema/emailAddress.schema.js';
import { fromJson, toJson } from '#util/json.js';
import { __dirname } from '#views/init.js';

import {
  getOldestPending,
  addEmailToQueue,
  setAttemptedAt,
  setSuccessful,
  setFailed,
} from '#db/schema/emailQueue.schema.js';

import {
  isoNowPlusMinutes,
  isoNow,
} from '#util/datetime.js';

const fromName = process.env.EMAIL_SEND_NAME
const fromEmail = process.env.EMAIL_SEND_ADDR;

export const makeEmailService = (di) => {
  const { db } = di.dbService;

  /**
   * @param {string} recipient to-emails
   * @param {string} subject
   * @param {string} htmlBody
   */
  const send = async (
    recipient,
    subject,
    htmlBody,
  ) => {
    const result = await axios.post(
      process.env.EMAIL_API_URL + "smtp/email",
      {
        sender: {
          name: fromName,
          email: fromEmail,
        },
        to: [{ email: recipient }],
        subject,
        htmlContent: htmlBody
      },
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.EMAIL_API_KEY,
        }
      }
    )
    const { status, data } = result

    if (status !== 201) {
      console.error(
        "email api response code:",
        status
      )
      return false
    }

    console.debug(
      'Message sent:',
      data.messageId
    );
    return true;
  };

  const checkQueue = async () => {
    const attemptFilterBy = isoNowPlusMinutes(-10);
    const emailInfo = db
      .prepare(getOldestPending)
      .get({ attemptFilterBy });
    if (!emailInfo) { return }

    const {
      id: emailQueueId,
      emailId,
      subject,
      templateName,
      templateData,
    } = emailInfo;
    const lastAttemptAt = isoNow()
    db.prepare(setAttemptedAt)
      .run({
        emailQueueId,
        lastAttemptAt,
      })

    const email = db
      .prepare(getEmailByEmailId)
      .get({ emailId });

    const templatePath = path.join(__dirname, templateName)

    const data = fromJson(templateData)

    const htmlBody = pug.renderFile(
      templatePath,
      {
        ...data,
        cache: true,
      });

    const success = await send(
      email.email,
      subject,
      htmlBody,
    );
    if (success) {
      db.prepare(setSuccessful)
        .run({
          emailQueueId,
          sentAt: isoNow(),
        })
    } else {
      db.prepare(setFailed)
        .run({
          lastAttemptAt,
          emailQueueId
        })
    }
  };

  const _interval = setInterval(checkQueue, 10000);

  const queueMessage = (
    emailId,
    subject,
    templateName,
    data,
  ) => {
    const queuedAt = isoNow();
    const templateData = toJson(data);
    db.prepare(addEmailToQueue).run({
      emailId,
      subject,
      templateName,
      templateData,
      queuedAt,
    });
  };

  return { queueMessage };
};
