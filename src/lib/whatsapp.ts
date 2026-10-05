export interface BookingMessageInput {
  name: string;
  contact: string;
  vehicleType: string;
  serviceName: string;
  date: string;
  notes?: string;
}

export interface BookingMessageLabels {
  greeting: string;
  name: string;
  contact: string;
  vehicleType: string;
  service: string;
  date: string;
  notes: string;
}

const DEFAULT_LABELS: BookingMessageLabels = {
  greeting: 'Halo, saya ingin booking servis.',
  name: 'Nama',
  contact: 'Kontak',
  vehicleType: 'Jenis Kendaraan',
  service: 'Layanan',
  date: 'Tanggal Kunjungan',
  notes: 'Catatan',
};

export function sanitizePhoneNumber(input: string): string {
  return input.replace(/\D/g, '');
}

export function isWhatsAppNumberUsable(number: string): boolean {
  return sanitizePhoneNumber(number).length >= 8;
}

export function buildBookingMessage(
  input: BookingMessageInput,
  labels: BookingMessageLabels = DEFAULT_LABELS,
): string {
  const lines = [
    labels.greeting,
    '',
    `${labels.name}: ${input.name}`,
    `${labels.contact}: ${input.contact}`,
    `${labels.vehicleType}: ${input.vehicleType}`,
    `${labels.service}: ${input.serviceName}`,
    `${labels.date}: ${input.date}`,
  ];

  const notes = input.notes?.trim();
  if (notes) {
    lines.push(`${labels.notes}: ${notes}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${sanitizePhoneNumber(number)}?text=${encodeURIComponent(message)}`;
}
