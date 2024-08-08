import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './navbar';

test('renders Navbar with links and logo', () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );

  expect(screen.getByAltText(/Fashion Vista Logo/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search products.../i)).toBeInTheDocument();
  expect(screen.getAllByText(/mens/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/womens/i).length).toBeGreaterThan(0);
});

test('renders Navbar links correctly', () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );

  expect(screen.getAllByText(/mens/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/womens/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/kids/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/accessories/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Home & Living/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/beauty/i).length).toBeGreaterThan(0);
});

test('renders Navbar icons correctly', () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );

  expect(screen.getByTestId('wishlist-link')).toBeInTheDocument();
  expect(screen.getByTestId('cart-link')).toBeInTheDocument();
});
