import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Faq } from './Faq';

describe('Faq', () => {
  it('renders the questions and toggles an answer open', async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const first = screen.getByRole('button', { name: /booking dulu/i });
    expect(first).toHaveAttribute('aria-expanded', 'false');

    await user.click(first);

    expect(first).toHaveAttribute('aria-expanded', 'true');
  });
});
