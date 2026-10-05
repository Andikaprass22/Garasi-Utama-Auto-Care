import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

const SECTION_IDS = [
  'beranda',
  'layanan',
  'harga',
  'alur',
  'keunggulan',
  'galeri',
  'testimoni',
  'lokasi',
  'booking',
  'faq',
];

describe('App', () => {
  it('renders the page landmarks and every main section', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    for (const id of SECTION_IDS) {
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it('exposes working WhatsApp calls to action', () => {
    render(<App />);

    const links = screen.getAllByRole('link', { name: /whatsapp/i });
    expect(links.length).toBeGreaterThan(0);

    for (const link of links) {
      expect(String(link.getAttribute('href'))).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    }
  });

  it('renders the booking form fields', () => {
    render(<App />);

    expect(screen.getByLabelText(/nama/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/kontak/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/jenis kendaraan/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/layanan/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tanggal kunjungan/i)).toBeInTheDocument();
  });
});
