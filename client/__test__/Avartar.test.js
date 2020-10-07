import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import Avatar from '../components/Avatar';

const avatarComponent = (AltProfilePic, height, width, text) =>
  render(
    <Avatar alt={AltProfilePic} height={height} width={width} text={text} />
  );

describe('Avatar component', () => {
  afterEach(() => {
    cleanup();
  });

  test('render correctly', () => {
    const testComponent = avatarComponent('alt', 50, 50);
    expect(testComponent).toMatchSnapshot();
  });

  test('should show text', () => {
    avatarComponent('alt', 50, 50, 'hello');
    expect(screen.findByText(/hello/i)).toBeTruthy();
  });
});
