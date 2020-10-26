import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Bar from '../components/Bar';

afterEach(cleanup);

describe('Bar', () => {
  test('should render', () => {
    render(<Bar />);
    expect(screen.getByTestId('bar')).toBeInTheDocument();
  });
});
