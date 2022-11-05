import { render, screen } from '@testing-library/react';

import { renderComponents } from '@lib/utils';

const text = 'Mock Component';

const components = [1, 2, 3].map(() => {
  const Component = <div>{text}</div>;

  return Component;
});

describe('renderComponents()', () => {
  it('should render components from a component list', () => {
    render(renderComponents({ components }));

    screen.getAllByText(text).forEach((component) => {
      expect(component).toBeInTheDocument();
    });
  });
});
