import pino from 'pino';

import { EAPOLLOCLIENT, ECONTENTCONTROLLER, EROWFACTORY } from './types';

export const LOG = {
  INFO: {},
  WARN: {},
  ERROR: {
    FACTORY: {
      ROW: EROWFACTORY,
    },
    CONTROLLER: {
      CONTENT_CONTROLLER: ECONTENTCONTROLLER,
    },
    ROUTES: {},
    CLIENTS: {
      APOLLO: EAPOLLOCLIENT,
    },
  },
};

export const logger = pino({
  prettyPrint: true,
});
