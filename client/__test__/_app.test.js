import { render } from '@testing-library/react';
import App from '../pages/_app';

describe('App', () => {
  it('renders without crashing', () => {
    const component = render(<App />);
    expect(component.baseElement).toMatchSnapshot();
  });
});
