import React, { FC } from 'react';
import { fromMarkdown } from '@lib/utils';

import { IProps } from './types';

/**
 * Takes a string with line breaks and resolves into a multi-paragraph react component
 * If the string has markdown then resolves as parsed jsx html
 *
 * @param {string} body The body of the text that contains the paragraphs
 * @param {string} className The custom class styles for the component
 * @param {boolean} hasMarkdown Whether the rendered output should be markdown parsed or not
 * @returns The resolved jsx
 */
export const renderParagraphs: FC<IProps> | any = ({ body, className, hasMarkdown = false }) => {
  if (hasMarkdown) return fromMarkdown({ text: String(body) });

  const paragraphs = body?.split(/\r?\n/);

  return (
    <>
      {paragraphs?.map((p: string, key: React.Key | null | undefined) => (
        <p key={key} className={className}>
          {p}
        </p>
      )) || null}
    </>
  );
};
