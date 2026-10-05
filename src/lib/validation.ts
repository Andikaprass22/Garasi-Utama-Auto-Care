export interface BookingFormValues {
  name: string;
  contact: string;
  vehicleType: string;
  serviceId: string;
  date: string;
  notes: string;
}

export type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>;

const CONTACT_PATTERN = /^[0-9+()\-\s]{8,}$/;

export function isTodayOrLater(date: string, today: Date = new Date()): boolean {
  if (!date) {
    return false;
  }

  const parts = date.split('-').map(Number);
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return false;
  }

  const [year, month, day] = parts;
  const candidate = new Date(year, month - 1, day);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return candidate.getTime() >= startOfToday.getTime();
}

export function validateBooking(values: BookingFormValues, today: Date = new Date()): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Nama wajib diisi.';
  }

  if (!values.contact.trim()) {
    errors.contact = 'Nomor kontak wajib diisi.';
  } else if (!CONTACT_PATTERN.test(values.contact.trim())) {
    errors.contact = 'Nomor kontak tidak valid.';
  }

  if (!values.vehicleType.trim()) {
    errors.vehicleType = 'Jenis kendaraan wajib dipilih.';
  }

  if (!values.serviceId.trim()) {
    errors.serviceId = 'Layanan wajib dipilih.';
  }

  if (!values.date.trim()) {
    errors.date = 'Tanggal kunjungan wajib diisi.';
  } else if (!isTodayOrLater(values.date, today)) {
    errors.date = 'Tanggal tidak boleh sebelum hari ini.';
  }

  return errors;
}
