import { describe, it, expect } from 'vitest';
import { formatRupiah, formatPriceRange } from './currency';

describe('formatRupiah', () => {
  it('formats a value with Rp prefix and dot separators', () => {
    expect(formatRupiah(150000)).toBe('Rp150.000');
    expect(formatRupiah(1500000)).toBe('Rp1.500.000');
  });

  it('handles zero', () => {
    expect(formatRupiah(0)).toBe('Rp0');
  });
});

describe('formatPriceRange', () => {
  it('renders a range when an upper bound exists', () => {
    expect(formatPriceRange(150000, 350000)).toBe('Rp150.000 – Rp350.000');
  });

  it('renders a "mulai" prefix when only a lower bound exists', () => {
    expect(formatPriceRange(150000)).toBe('mulai Rp150.000');
  });
});
