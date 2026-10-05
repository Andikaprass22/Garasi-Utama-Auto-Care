import { describe, it, expect } from 'vitest';
import { validateBooking, isTodayOrLater } from './validation';
import type { BookingFormValues } from './validation';

const today = new Date('2026-10-05T10:00:00');

const validValues: BookingFormValues = {
  name: 'Andi',
  contact: '081200000000',
  vehicleType: 'Mobil',
  serviceId: 'ganti-oli',
  date: '2026-10-06',
  notes: '',
};

describe('validateBooking', () => {
  it('returns an error for every empty required field', () => {
    const errors = validateBooking(
      { name: '', contact: '', vehicleType: '', serviceId: '', date: '', notes: '' },
      today,
    );

    expect(Object.keys(errors)).toEqual(
      expect.arrayContaining(['name', 'contact', 'vehicleType', 'serviceId', 'date']),
    );
    expect(Object.keys(errors)).toHaveLength(5);
  });

  it('rejects a past visit date', () => {
    const errors = validateBooking({ ...validValues, date: '2026-10-04' }, today);
    expect(errors.date).toBeTruthy();
  });

  it('accepts a valid submission including today', () => {
    expect(validateBooking({ ...validValues, date: '2026-10-05' }, today)).toEqual({});
  });
});

describe('isTodayOrLater', () => {
  it('is true for today and the future, false for the past', () => {
    expect(isTodayOrLater('2026-10-05', today)).toBe(true);
    expect(isTodayOrLater('2026-10-06', today)).toBe(true);
    expect(isTodayOrLater('2026-10-04', today)).toBe(false);
  });

  it('is false for an empty or malformed value', () => {
    expect(isTodayOrLater('', today)).toBe(false);
    expect(isTodayOrLater('bukan-tanggal', today)).toBe(false);
  });
});
