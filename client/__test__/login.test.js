import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Login from '../components/Login';

afterEach(cleanup);

describe('Login', () => {
  test('renders without crashing', () => {
    const component = render(<Login />);
    expect(component.baseElement).toMatchSnapshot();
  });

  test('renders Google, Github and Facebook buttons', () => {
    render(<Login />);
    expect(screen.getByText('Google')).toBeTruthy();
    expect(screen.getByText('Facebook')).toBeTruthy();
    expect(screen.getByText('Github')).toBeTruthy();
  });
});
