import React, { FC, ReactElement, JSXElementConstructor } from 'react';
import { ComponentT } from '@lib/types';

/**
 * Takes in a list of react components and maps throught it to render all of them
 * in sequential order.
 *
 * @param {any} components The list of components to render
 * @returns {FC<any>} A react function component that renders all the components in the list
 */
export const renderComponents: FC<any> | any = ({
  components,
}): ReactElement<any, string | JSXElementConstructor<any>> =>
  components?.map((c: ComponentT, key: React.Key | null | undefined) => (
    <React.Fragment key={key}> {c} </React.Fragment>
  )) || <></>;
