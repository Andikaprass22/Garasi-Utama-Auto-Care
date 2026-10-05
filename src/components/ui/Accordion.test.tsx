import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

const items = [
  { question: 'Apakah harus booking?', answer: 'Sangat disarankan.' },
  { question: 'Berapa lama pengerjaannya?', answer: 'Sekitar 60 menit.' },
];

describe('Accordion', () => {
  it('starts collapsed and expands when clicked', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const button = screen.getByRole('button', { name: 'Apakah harus booking?' });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Sangat disarankan.')).toBeVisible();
  });

  it('can be toggled with the keyboard', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const button = screen.getByRole('button', { name: 'Berapa lama pengerjaannya?' });
    button.focus();
    await user.keyboard('{Enter}');

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
