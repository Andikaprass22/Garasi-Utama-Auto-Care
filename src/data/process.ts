import type { ProcessStep } from '../types/content';

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Booking',
    description: 'Isi formulir booking atau hubungi WhatsApp dengan layanan dan jenis kendaraan yang dipilih.',
  },
  {
    step: 2,
    title: 'Konfirmasi',
    description: 'Admin menghubungi Anda untuk memastikan jadwal dan kedatangan.',
  },
  {
    step: 3,
    title: 'Pemeriksaan & Estimasi',
    description: 'Kendaraan diperiksa, lalu estimasi biaya dan waktu disampaikan sebelum pengerjaan.',
  },
  {
    step: 4,
    title: 'Pengerjaan',
    description: 'Teknisi mengerjakan sesuai kesepakatan. Pekerjaan tambahan hanya dilakukan dengan persetujuan Anda.',
  },
  {
    step: 5,
    title: 'Quality Check',
    description: 'Hasil diperiksa ulang dan diuji fungsi sebelum kendaraan dinyatakan siap.',
  },
  {
    step: 6,
    title: 'Serah Terima',
    description: 'Kendaraan diserahkan kembali beserta catatan pekerjaan dan saran perawatan berikutnya.',
  },
];
