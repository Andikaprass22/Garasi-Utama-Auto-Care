import type { Service } from '../types/content';

export const services: Service[] = [
  {
    id: 'servis-rutin',
    name: 'Servis Rutin',
    description:
      'Pemeriksaan berkala mesin, cairan, filter, kelistrikan dasar, dan kondisi kaki-kaki agar kendaraan tetap prima.',
    duration: '±60 menit',
    icon: 'wrench',
  },
  {
    id: 'ganti-oli',
    name: 'Ganti Oli',
    description:
      'Penggantian oli mesin beserta filter oli, menggunakan oli sesuai spesifikasi kendaraan Anda.',
    duration: '±30 menit',
    icon: 'oil',
  },
  {
    id: 'pemeriksaan-rem',
    name: 'Pemeriksaan Rem',
    description:
      'Pengecekan kampas, cakram, minyak rem, dan sistem pengereman untuk memastikan daya cengkeram aman.',
    duration: '±45 menit',
    icon: 'brake',
  },
  {
    id: 'perbaikan-mesin',
    name: 'Perbaikan Mesin',
    description:
      'Diagnosa dan perbaikan keluhan mesin seperti suara tidak normal, mesin brebet, atau kebocoran.',
    duration: 'Mulai ±2 jam',
    icon: 'engine',
  },
  {
    id: 'detailing',
    name: 'Detailing',
    description:
      'Pembersihan dan perawatan menyeluruh bagian luar dan dalam kabin, termasuk poles bodi dan interior.',
    duration: '±3 jam',
    icon: 'sparkle',
  },
];
