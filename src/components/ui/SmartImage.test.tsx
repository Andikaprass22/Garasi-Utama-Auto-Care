import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SmartImage } from './SmartImage';

describe('SmartImage', () => {
  it('renders the image with its alt text', () => {
    render(<SmartImage src="/images/hero-garage.jpg" alt="Area bengkel" />);
    expect(screen.getByAltText('Area bengkel')).toBeInTheDocument();
  });

  it('shows a labelled fallback when the image fails to load', () => {
    render(<SmartImage src="/images/hilang.jpg" alt="Area bengkel" fallbackLabel="Foto bengkel" />);

    fireEvent.error(screen.getByAltText('Area bengkel'));

    expect(screen.getByText('Foto bengkel')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Area bengkel' })).toBeInTheDocument();
  });
});
