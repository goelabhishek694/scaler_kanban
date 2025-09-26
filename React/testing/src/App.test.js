import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  //rendering our component
  render(<App />);
  //screen - > will get the output
  const linkElement = screen.getByText(/learn react/i);

  //compare acual output ith expected output
  expect(linkElement).toBeInTheDocument();
});
