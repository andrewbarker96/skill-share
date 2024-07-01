import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  const { baseElement } = render(<App isAuthenticated={true} />);
  expect(baseElement).toBeDefined();
});
