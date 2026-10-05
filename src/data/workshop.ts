import type { WorkshopInfo } from '../types/content';

// GANTI: semua nilai di bawah ini adalah contoh. Isi dengan data bengkel milik klien.
// Nomor WhatsApp wajib berupa digit tanpa "+", spasi, atau tanda hubung (contoh: 6281234567890).
export const workshop: WorkshopInfo = {
  name: 'Garasi Utama Auto Care',
  tagline: 'Servis rapi, estimasi jelas, hasil bisa dicek.',
  description:
    'Bengkel harian untuk mobil dan motor: servis rutin, ganti oli, pemeriksaan rem, perbaikan mesin, sampai detailing. Setiap pekerjaan dimulai dari pemeriksaan dan estimasi yang disampaikan lebih dulu.',
  shortDescription: 'Servis rutin, ganti oli, rem, mesin, dan detailing untuk mobil dan motor.',
  phoneDisplay: '0812-0000-0000',
  phoneE164: '+6281200000000',
  whatsappNumber: '6281200000000',
  whatsappDefaultMessage:
    'Halo Garasi Utama Auto Care, saya ingin bertanya tentang layanan servis kendaraan saya.',
  email: 'halo@garasiutama.example',
  address: {
    line1: 'Jl. Contoh Raya No. 123',
    city: 'Jakarta Selatan',
    region: 'DKI Jakarta',
    postalCode: '12345',
    country: 'Indonesia',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=-6.261493%2C106.810600',
  mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-6.261493%2C106.810600',
  mapsEmbedUrl: 'https://www.google.com/maps?q=-6.261493,106.810600&z=16&output=embed',
  // Media sosial disembunyikan selama url masih kosong ("").
  // Isi dengan akun resmi agar ikonnya muncul di footer, contoh:
  // { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/namaakun' }
  socials: [
    { platform: 'instagram', label: 'Instagram', url: '' },
    { platform: 'facebook', label: 'Facebook', url: '' },
    { platform: 'tiktok', label: 'TikTok', url: '' },
    { platform: 'youtube', label: 'YouTube', url: '' },
  ],
  hours: [
    { day: 'Senin', open: '08.00', close: '17.00' },
    { day: 'Selasa', open: '08.00', close: '17.00' },
    { day: 'Rabu', open: '08.00', close: '17.00' },
    { day: 'Kamis', open: '08.00', close: '17.00' },
    { day: 'Jumat', open: '08.00', close: '17.00' },
    { day: 'Sabtu', open: '08.00', close: '15.00' },
    { day: 'Minggu', open: '-', close: '-', closed: true },
  ],
  businessInfo: {
    foundedYear: 2016,
    // GANTI (opsional): nama badan usaha jika ingin ditampilkan di footer.
    legalName: undefined,
  },
};
