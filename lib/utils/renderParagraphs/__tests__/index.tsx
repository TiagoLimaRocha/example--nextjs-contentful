import { render, screen } from '@testing-library/react';

import { renderParagraphs } from '@lib/utils';

import { dataMock } from '@mocks/utils/renderParagraphs/data.mock';

describe('renderParagraphs()', () => {
  it('should render multiple paragraphs', () => {
    render(<>{renderParagraphs({ body: dataMock })}</>);

    const paragraphs = dataMock.split('\n');

    paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('should render multiple paragraphs with a specific classname when provided', () => {
    const mockClassname = 'MOCK_CLASSNAME';
    const paragraphs = dataMock.split('\n');

    render(<>{renderParagraphs({ body: dataMock, className: mockClassname })}</>);

    paragraphs.forEach((paragraph) => {
      const snap = screen.getByText(paragraph);

      expect(snap).toBeInTheDocument();
      expect(snap).toHaveClass(mockClassname);
    });
  });

  it('should render parsed markup when the body is a markdown string', () => {
    const mockMarkdownString = `
      ## Formating

      **bold text**, 
      
      *italic text*, 
      
      <u>underlined text</u>, 
      
      ~~striked out~~,
      
      [link example](www.google.com)
      
      > quote example
      
      ## Lists
      
      ### Unordered
      
      - item 1
      - item 2
      - item 3
      
      ### Ordered
      
      1. Item 1
      2. Item 2
      3. Item 3
    `;

    const output = render(<>{renderParagraphs({ body: mockMarkdownString, hasMarkdown: true })}</>);

    expect(output).toMatchSnapshot();
  });

  it('should not render anything when body is not provided', () => {
    render(<>{renderParagraphs({ body: '' })});</>);

    const paragraphs = dataMock.split('\n');

    paragraphs.forEach((paragraph) => {
      const snap = screen.queryByText(paragraph);

      expect(snap).toBeNull();
    });
  });
});
