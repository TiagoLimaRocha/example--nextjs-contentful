import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import { marked } from 'marked';

import { FromMarkdownI } from './types';

/**
 * Parses a markdown string and returns a corresponding markup mapping
 *
 * @param {string} text The markdown string to parse
 * @param {boolean} isHeading Whether the text string is a heading or not
 * @returns The parsed markup
 */
export const fromMarkdown = ({ text }: FromMarkdownI) => {
  const html = (text && marked.parse(text)) || '';
  const sanitized = DOMPurify.sanitize(html);

  return parse(sanitized);
};
