import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Smoke test — does the app render without crashing?
test('renders without crashing', () => {
    render(<App />);
});

// Navbar renders with brand name
test('renders navigation with brand name', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/Movies/i);
    expect(brandElements.length).toBeGreaterThan(0);
});
