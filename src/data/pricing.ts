import type { PriceItem } from '../types/content';

// GANTI: sesuaikan rentang harga dengan bengkel klien. Nilai dalam Rupiah.
export const pricing: PriceItem[] = [
  {
    serviceId: 'servis-rutin',
    vehicleType: 'mobil',
    label: 'Servis rutin mobil',
    priceFrom: 350000,
    priceTo: 750000,
  },
  {
    serviceId: 'servis-rutin',
    vehicleType: 'motor',
    label: 'Servis rutin motor',
    priceFrom: 75000,
    priceTo: 200000,
  },
  {
    serviceId: 'ganti-oli',
    vehicleType: 'mobil',
    label: 'Ganti oli mesin mobil',
    priceFrom: 350000,
    priceTo: 900000,
  },
  {
    serviceId: 'ganti-oli',
    vehicleType: 'motor',
    label: 'Ganti oli mesin motor',
    priceFrom: 60000,
    priceTo: 150000,
  },
  {
    serviceId: 'pemeriksaan-rem',
    vehicleType: 'umum',
    label: 'Pemeriksaan & servis rem',
    priceFrom: 150000,
    priceTo: 600000,
  },
  {
    serviceId: 'perbaikan-mesin',
    vehicleType: 'umum',
    label: 'Perbaikan mesin (mulai dari)',
    priceFrom: 500000,
  },
  {
    serviceId: 'detailing',
    vehicleType: 'mobil',
    label: 'Detailing mobil',
    priceFrom: 500000,
    priceTo: 1500000,
  },
  {
    serviceId: 'detailing',
    vehicleType: 'motor',
    label: 'Detailing motor',
    priceFrom: 100000,
    priceTo: 350000,
  },
];

export const pricingNote =
  'Harga di atas adalah perkiraan awal sebagai gambaran. Harga akhir menyesuaikan kondisi kendaraan dan dapat berubah setelah pemeriksaan. Estimasi selalu disampaikan sebelum pengerjaan dimulai.';
