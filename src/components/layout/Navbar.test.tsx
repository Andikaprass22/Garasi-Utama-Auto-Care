import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('toggles the mobile menu with the hamburger button', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole('button', { name: /menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('offers a "Booking Servis" call to action that points at the booking section', () => {
    render(<Navbar />);

    const links = screen.getAllByRole('link', { name: /booking servis/i });
    expect(links.some((link) => link.getAttribute('href') === '#booking')).toBe(true);
  });
});
