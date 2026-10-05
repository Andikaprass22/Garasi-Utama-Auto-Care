import type { SiteImages } from '../types/content';

// GANTI: tukar berkas di public/images/ atau arahkan src ke URL foto milik klien.
export const images: SiteImages = {
  hero: {
    src: '/images/hero-garage.jpg',
    alt: 'Kendaraan terangkat di lift dengan perlengkapan bengkel di sekelilingnya',
  },
  heroSecondary: {
    src: '/images/mechanic-suspension.jpg',
    alt: 'Teknisi sedang memeriksa komponen kendaraan',
  },
};
