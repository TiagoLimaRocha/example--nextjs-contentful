import React, { FC } from 'react';

import { logger, LOG } from '@clients/Logger';

// here is where we import our row components
import { RowComponent } from './components';

// here is where we map our components with a key
export const rowItem = { rowComponent: RowComponent };

export type CreateRowT = {
  type: typeof rowItem | any;
  attributes: any;
};

/**
 * Builder method for creating Row components for the web pages.
 * It wraps a constructor for different types of row items and returns instances of the objects via
 * a simple API.
 *
 * @param {string} type The type of the row component
 * @param {any} attributes The props of the row
 * @returns {JSX.Element} The built Row component to render.
 */
export const createRow: FC<CreateRowT> = ({ type, attributes }): JSX.Element | null => {
  try {
    const Row = rowItem[type];

    if (!attributes?.display) return null;

    if (!Row)
      throw new TypeError(
        'EROWFACTORY: could not parse row component, check if row type matches the mappings',
      );

    return <Row {...attributes} />;
  } catch (err) {
    logger.warn(
      {
        component: type,
        err,
      },
      LOG.ERROR.FACTORY.ROW.CREATE_ROW,
    );

    return null;
  }
};

export default createRow;
