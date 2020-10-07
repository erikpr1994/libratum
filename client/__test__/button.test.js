import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Button from '../components/Button';

afterEach(cleanup);

describe('Button', () => {
  const defaultProps = {
    name: 'Rebalance',
  };
  test('Button renders with correct text', () => {
    const { queryByText, container } = render(<Button {...defaultProps} />);
    expect(queryByText('Rebalance')).toBeTruthy();
    expect(container.baseElement).toMatchSnapshot();
  });
});
