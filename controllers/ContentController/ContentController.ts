/**
 * Page Controller
 *
 * @description Provides a link layer between the cms content and the web application
 */

import Apollo from '@clients/Apollo';
import { gql } from '@apollo/client';

import { logger, LOG } from '@clients/Logger';

export const getRows = async () => {
  try {
    const data = await Apollo.query({
      query: gql``,
    });

    return data;
  } catch (error) {
    logger.error(error, LOG.ERROR.CONTROLLER.CONTENT_CONTROLLER.GET_ROWS);

    return null;
  }
};
