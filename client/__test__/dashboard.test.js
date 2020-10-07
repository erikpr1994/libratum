import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import Dashboard from '../pages/dashboard';

describe('Dashboard', () => {
  afterEach(() => {
    cleanup();
  });

  test('render correctly', () => {
    const dashBoard = render(<Dashboard />);
    expect(dashBoard.baseElement).toMatchSnapshot();
  });

  test('should render title', () => {
    render(<Dashboard />);
    expect(screen.findByText(/Libratum Dashboard/i)).toBeTruthy();
  });
});
