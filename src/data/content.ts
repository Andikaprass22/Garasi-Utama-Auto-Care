import type { IconName } from '../types/content';
import { workshop } from './workshop';

// GANTI: seluruh teks antarmuka (judul bagian, label tombol, label form, dsb.)
// berada di berkas ini. Ubah di sini agar komponen tidak perlu disentuh.
export const content = {
  navbar: {
    subtitle: 'Servis & Detailing',
    bookingCta: 'Booking Servis',
  },
  hero: {
    badge: 'Bengkel mobil & motor',
    imageAlt: 'Suasana area kerja bengkel dan teknisi yang sedang mengerjakan kendaraan',
    primaryCta: 'Lihat Layanan',
    secondaryCta: 'Booking Servis',
    facts: [
      { icon: 'calendar', label: 'Kunjungan', value: 'Booking disarankan' },
      { icon: 'car', label: 'Melayani', value: 'Mobil & motor' },
      { icon: 'map', label: 'Lokasi', value: workshop.address.city },
    ] as { icon: IconName; label: string; value: string }[],
  },
  services: {
    eyebrow: 'Layanan',
    title: 'Perawatan yang paling sering dibutuhkan',
    description:
      'Pilih layanan yang sesuai. Jika belum yakin, sampaikan keluhan kendaraan Anda dan kami bantu tentukan pemeriksaan yang tepat.',
    durationPrefix: 'Estimasi',
  },
  pricing: {
    eyebrow: 'Harga',
    title: 'Perkiraan biaya yang transparan',
    description:
      'Daftar ini membantu Anda memperkirakan anggaran sebelum datang. Estimasi final diberikan setelah kendaraan diperiksa.',
    columnService: 'Layanan',
    columnVehicle: 'Kendaraan',
    columnPrice: 'Perkiraan harga',
    caption: 'Daftar perkiraan harga layanan bengkel',
    scrollHint: 'Geser tabel ke samping untuk melihat semua kolom.',
    vehicleLabel: { mobil: 'Mobil', motor: 'Motor', umum: 'Mobil & motor' } as Record<string, string>,
  },
  process: {
    eyebrow: 'Alur servis',
    title: 'Dari booking sampai kendaraan siap',
    description: 'Enam langkah yang membuat Anda tahu apa yang sedang terjadi pada kendaraan Anda.',
  },
  advantages: {
    eyebrow: 'Keunggulan',
    title: 'Alasan memilih bengkel ini',
    description: 'Hal-hal praktis yang membuat servis lebih tenang, tanpa klaim berlebihan.',
  },
  gallery: {
    eyebrow: 'Galeri',
    title: 'Bengkel dan hasil pekerjaan',
    description: 'Sebagian suasana area kerja dan proses pengerjaan. Ketuk foto untuk melihat lebih besar.',
    zoomLabelPrefix: 'Perbesar foto:',
    closeLabel: 'Tutup galeri',
  },
  testimonials: {
    eyebrow: 'Testimoni',
    title: 'Kata pelanggan',
    description:
      'Contoh testimoni untuk memperlihatkan tata letak. Ganti dengan ulasan asli pelanggan Anda sebelum dipublikasikan.',
    demoBadge: 'Contoh',
    ratingLabelPrefix: 'Rating',
  },
  location: {
    eyebrow: 'Lokasi & jam buka',
    title: 'Kunjungi bengkel kami',
    description: 'Datang sesuai jam operasional atau minta petunjuk arah langsung dari peta.',
    addressHeading: 'Alamat',
    hoursHeading: 'Jam operasional',
    openMapsLabel: 'Buka di Google Maps',
    directionsLabel: 'Petunjuk arah',
    callLabel: 'Telepon bengkel',
    closedLabel: 'Tutup',
    mapTitlePrefix: 'Peta lokasi',
  },
  booking: {
    eyebrow: 'Booking',
    title: 'Buat jadwal servis',
    description:
      'Isi data singkat di bawah ini. Setelah dikirim, pesan otomatis berisi layanan dan jenis kendaraan Anda akan terbuka di WhatsApp untuk diselesaikan.',
    bullets: [
      'Pesan WhatsApp otomatis memuat layanan dan jenis kendaraan yang dipilih.',
      'Admin akan mengonfirmasi jadwal melalui kontak yang Anda isi.',
      'Belum yakin layanannya? Pilih layanan apa pun lalu tulis keluhan di kolom catatan.',
    ],
    directChatLabel: 'Chat langsung via WhatsApp',
    labels: {
      name: 'Nama',
      contact: 'Nomor Kontak',
      vehicleType: 'Jenis Kendaraan',
      service: 'Layanan',
      date: 'Tanggal Kunjungan',
      notes: 'Catatan (opsional)',
    },
    placeholders: {
      name: 'Nama lengkap',
      contact: '08xx xxxx xxxx',
      vehicleType: 'Pilih jenis kendaraan',
      service: 'Pilih layanan',
      notes: 'Tulis keluhan atau catatan tambahan',
    },
    notesHint: 'Contoh: keluhan, jam yang diinginkan, atau permintaan khusus.',
    vehicleOptions: [
      { value: 'Mobil', label: 'Mobil' },
      { value: 'Motor', label: 'Motor' },
      { value: 'Lainnya', label: 'Lainnya' },
    ],
    submitLabel: 'Kirim via WhatsApp',
    resetLabel: 'Isi ulang',
    unavailableMessage: 'Nomor WhatsApp belum diatur pada src/data/workshop.ts.',
    successMessage:
      'Permintaan booking Anda sudah disiapkan di WhatsApp. Selesaikan dan kirim pesannya melalui aplikasi WhatsApp.',
    reopenLabel: 'WhatsApp tidak terbuka? Buka lagi',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Pertanyaan yang sering diajukan',
    description: 'Belum menemukan jawabannya? Hubungi kami lewat WhatsApp.',
  },
  footer: {
    navigationHeading: 'Navigasi',
    contactHeading: 'Kontak',
    bookingLabel: 'Booking Servis',
    socialsAriaLabel: 'Media sosial bengkel',
  },
  // Label pada pesan WhatsApp otomatis. Ganti bila ingin bahasa lain.
  whatsappMessage: {
    greeting: 'Halo, saya ingin booking servis.',
    name: 'Nama',
    contact: 'Kontak',
    vehicleType: 'Jenis Kendaraan',
    service: 'Layanan',
    date: 'Tanggal Kunjungan',
    notes: 'Catatan',
  },
} as const;

export type WhatsappMessageLabels = typeof content.whatsappMessage;
