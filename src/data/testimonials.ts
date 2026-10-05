import type { Testimonial } from '../types/content';

// GANTI: testimoni di bawah adalah contoh (isDemo: true) dan bukan ulasan pelanggan nyata.
// Ganti dengan testimoni asli dari klien sebelum dipublikasikan.
export const testimonials: Testimonial[] = [
  {
    name: 'Andi P.',
    vehicle: 'Toyota Avanza 2018',
    rating: 5,
    quote: 'Dijelaskan dulu apa yang perlu diganti dan kenapa. Hasilnya rapi dan sesuai perkiraan.',
    isDemo: true,
  },
  {
    name: 'Sari W.',
    vehicle: 'Honda Vario 125',
    rating: 5,
    quote: 'Servis motor jadi cepat, ruang tunggunya nyaman, dan tidak ada biaya yang mendadak.',
    isDemo: true,
  },
  {
    name: 'Budi S.',
    vehicle: 'Mitsubishi Xpander 2020',
    rating: 4,
    quote: 'Antre sedikit saat akhir pekan, tapi hasil kerjanya memuaskan dan komunikasinya jelas.',
    isDemo: true,
  },
  {
    name: 'Nadia R.',
    vehicle: 'Daihatsu Ayla 2019',
    rating: 5,
    quote: 'Detailing-nya bersih sampai interior. Dikasih catatan kapan sebaiknya servis berikutnya.',
    isDemo: true,
  },
];
