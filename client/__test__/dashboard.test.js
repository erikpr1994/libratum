// import React from 'react';
// import { cleanup, render, screen } from '@testing-library/react';

// import Dashboard from '../pages/dashboard';

// describe('Dashboard', () => {
//   test('loader shows when data is loading', () => {
//     const { getByText, container } = render(<Dashboard />);
//     expect(getByText('Month increase')).toBeTruthy();
//     expect(container.firstChild).toMatchSnapshot();
//   });
// });

// describe('Avatar component', () => {
//   afterEach(() => {
//     cleanup();
//   });

//   test('render correctly', () => {
//     const dashBoard = render(<Dashboard />);
//     expect(dashBoard.baseElement).toMatchSnapshot();
//   });

//   test('should render title', () => {
//     render(<Dashboard />);
//     expect(screen.getByText(/Libratum Dashboard/i)).toBeTruthy();
//   });
// });
