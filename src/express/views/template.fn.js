import path from 'path';
import pug from 'pug';

import { __dirname } from '#express/middleware/views.mw.js';

import { fromJson } from '#util/json.fn.js';

export const renderTemplate = (templateName, templateData) => {
  const templatePath = path.join(__dirname, templateName);

  const data = fromJson(templateData);

  return pug.renderFile(
    templatePath,
    {
      ...data,
      cache: true,
    },
  );
};
