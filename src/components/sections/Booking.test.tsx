import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Booking } from './Booking';

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

describe('Booking', () => {
  let openSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
  });

  afterEach(() => {
    openSpy.mockRestore();
  });

  it('shows validation errors and does not open WhatsApp on an empty submit', async () => {
    const user = userEvent.setup();
    render(<Booking />);

    await user.click(screen.getByRole('button', { name: /kirim via whatsapp/i }));

    expect(screen.getByText('Nama wajib diisi.')).toBeInTheDocument();
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('opens WhatsApp with the chosen service and vehicle type on a valid submit', async () => {
    const user = userEvent.setup();
    render(<Booking />);

    await user.type(screen.getByLabelText(/nama/i), 'Andi');
    await user.type(screen.getByLabelText(/kontak/i), '081200000000');
    await user.selectOptions(screen.getByLabelText(/jenis kendaraan/i), 'Mobil');
    await user.selectOptions(screen.getByLabelText(/layanan/i), 'ganti-oli');
    fireEvent.change(screen.getByLabelText(/tanggal kunjungan/i), { target: { value: todayIso() } });

    await user.click(screen.getByRole('button', { name: /kirim via whatsapp/i }));

    expect(openSpy).toHaveBeenCalledTimes(1);

    const url = String(openSpy.mock.calls[0][0]);
    const decoded = decodeURIComponent(url);

    expect(url.startsWith('https://wa.me/')).toBe(true);
    expect(decoded).toContain('Layanan: Ganti Oli');
    expect(decoded).toContain('Jenis Kendaraan: Mobil');
    expect(screen.getByText(/whatsapp/i, { selector: '[role="status"]' })).toBeInTheDocument();
  });
});
