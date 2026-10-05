import { describe, it, expect } from 'vitest';
import {
  sanitizePhoneNumber,
  isWhatsAppNumberUsable,
  buildBookingMessage,
  buildWhatsAppUrl,
} from './whatsapp';

describe('sanitizePhoneNumber', () => {
  it('keeps digits only', () => {
    expect(sanitizePhoneNumber('+62 812-345')).toBe('62812345');
    expect(sanitizePhoneNumber('(0812) 0000')).toBe('08120000');
  });
});

describe('isWhatsAppNumberUsable', () => {
  it('accepts a realistic number regardless of formatting', () => {
    expect(isWhatsAppNumberUsable('6281200000000')).toBe(true);
    expect(isWhatsAppNumberUsable('+62 812-0000-0000')).toBe(true);
  });

  it('rejects empty, non-numeric, or too-short values', () => {
    expect(isWhatsAppNumberUsable('')).toBe(false);
    expect(isWhatsAppNumberUsable('   ')).toBe(false);
    expect(isWhatsAppNumberUsable('+')).toBe(false);
    expect(isWhatsAppNumberUsable('n/a')).toBe(false);
    expect(isWhatsAppNumberUsable('0812')).toBe(false);
  });
});

describe('buildBookingMessage', () => {
  it('includes all booking details', () => {
    const message = buildBookingMessage({
      name: 'Andi',
      contact: '081200000000',
      vehicleType: 'Mobil',
      serviceName: 'Ganti Oli',
      date: '2026-11-01',
    });

    expect(message).toContain('Andi');
    expect(message).toContain('081200000000');
    expect(message).toContain('Jenis Kendaraan: Mobil');
    expect(message).toContain('Layanan: Ganti Oli');
    expect(message).toContain('2026-11-01');
  });

  it('omits the notes line when notes are blank', () => {
    const message = buildBookingMessage({
      name: 'Andi',
      contact: '081200000000',
      vehicleType: 'Mobil',
      serviceName: 'Ganti Oli',
      date: '2026-11-01',
      notes: '   ',
    });

    expect(message).not.toContain('Catatan:');
  });

  it('appends notes when provided', () => {
    const message = buildBookingMessage({
      name: 'Andi',
      contact: '081200000000',
      vehicleType: 'Mobil',
      serviceName: 'Ganti Oli',
      date: '2026-11-01',
      notes: 'Ada bunyi di kaki-kaki',
    });

    expect(message).toContain('Catatan: Ada bunyi di kaki-kaki');
  });

  it('uses custom labels when supplied', () => {
    const message = buildBookingMessage(
      {
        name: 'Andi',
        contact: '081200000000',
        vehicleType: 'Mobil',
        serviceName: 'Ganti Oli',
        date: '2026-11-01',
      },
      {
        greeting: 'Halo',
        name: 'Name',
        contact: 'Phone',
        vehicleType: 'Vehicle',
        service: 'Service',
        date: 'Visit date',
        notes: 'Notes',
      },
    );

    expect(message).toContain('Service: Ganti Oli');
    expect(message).toContain('Vehicle: Mobil');
  });
});

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me url with an encoded message', () => {
    expect(buildWhatsAppUrl('62812', 'Halo Dunia')).toBe('https://wa.me/62812?text=Halo%20Dunia');
  });

  it('strips formatting from the number', () => {
    expect(buildWhatsAppUrl('+62 812-345', 'Hai')).toBe('https://wa.me/62812345?text=Hai');
  });
});
