import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Classes to Calendar title header', () => {
  const { getAllByText } = render(<App />);
  const title = getAllByText(/Classes to Calendar/i);
  expect(title).toBeDefined();
});
