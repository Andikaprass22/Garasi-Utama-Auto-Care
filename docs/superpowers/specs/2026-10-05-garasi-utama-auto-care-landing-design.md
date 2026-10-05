# Spec Desain — Landing Page Template Bengkel Kendaraan "Garasi Utama Auto Care"

- Tanggal: 2026-10-05
- Status: Draft untuk direview
- Jenis: Architectural (proyek baru dari nol)
- Path implementasi: `C:\Landing Page\Garasi-Utama-Auto-Care`

---

## 1. Ringkasan & Tujuan

Membangun landing page profesional untuk bengkel kendaraan memakai **Vite + React + TypeScript**, yang dirancang sebagai **template jual-ulang** untuk bengkel mobil, motor, atau detailing.

Tujuan utama: klien (pemilik bengkel) dapat mengganti **nama bengkel, layanan, harga, foto, lokasi, dan kontak** tanpa menyentuh komponen UI — cukup mengedit file data terpusat.

Contoh merek yang dipakai: **Garasi Utama Auto Care**.

### Tujuan (Goals)

1. Landing page single-page yang meyakinkan, rapi, dan berkarakter (bukan tampilan generik).
2. Semua konten terpisah dari tampilan (`src/data/*`), mudah disesuaikan per klien.
3. Alur booking + WhatsApp benar-benar berfungsi, pesan WA otomatis memuat **layanan** dan **jenis kendaraan** terpilih.
4. Nyaman di desktop dan mobile, aksesibel, dan tidak ada tautan kosong/tombol mati.
5. Proyek bisa dijalankan (`dev`) dan lolos `build` tanpa error.

### Bukan Tujuan (Non-Goals)

- Tanpa backend/database, tanpa CMS, tanpa autentikasi.
- Tanpa pembayaran online.
- Tanpa multi-bahasa (konten Indonesia saja).
- Tanpa klaim layanan yang tidak dapat dibuktikan (mis. "nomor 1", "garansi seumur hidup").
- Bukan aplikasi multi-halaman.

---

## 2. Pengguna Sasaran

- **Pembeli template**: pemilik/agen bengkel yang ingin situs cepat jadi, hanya ganti data.
- **Pemilik bengkel (end-user tidak langsung)**: butuh presentasi tepercaya + tombol booking/WA yang langsung menghasilkan lead.
- **Pelanggan bengkel (pengunjung)**: butuh tahu layanan, kisaran harga, lokasi, jam buka, dan cara cepat membuat janji.

---

## 3. Kriteria Sukses

1. `npm install && npm run build` sukses tanpa error TypeScript.
2. `npm run dev` menampilkan seluruh section tanpa console error.
3. Klik "Booking Servis" mengarah ke form booking; submit form membuka WhatsApp dengan pesan berisi nama, kontak, jenis kendaraan, layanan, dan tanggal.
4. Tombol WhatsApp umum (navbar/footer/floating) berfungsi.
5. FAQ bisa dibuka/tutup lewat mouse dan keyboard.
6. Navbar, anchor scroll, dan menu mobile memberi respons yang jelas.
7. Tidak ada `<a href="#">` kosong maupun tombol tanpa handler.
8. Mengganti isi `src/data/workshop.ts` (nama/telepon/alamat) langsung terlihat di seluruh halaman tanpa mengubah komponen.
9. Unit test inti (message builder, format harga, validasi, FAQ toggle) lulus.

---

## 4. Batasan & Asumsi

- Konten Indonesia; format harga Rupiah (`Rp`).
- Nomor WhatsApp, alamat, telp, media sosial, dan URL Maps **placeholder** di `workshop.ts` (ditandai jelas) hingga klien mengisi data asli.
- Foto memakai URL stok gratis (Unsplash) yang diletakkan di satu modul `data/images.ts`, mudah diganti dengan foto klien.
- Tidak menyematkan nomor/alamat palsu yang tampak nyata; pakai placeholder yang jelas.

---

## 5. Tech Stack

- **Build**: Vite 5+
- **UI**: React 18 + TypeScript (strict)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`, token tema di CSS (`@theme`)
- **Font**: Google Fonts — `Sora` (heading) + `Inter` (body), dengan fallback sistem
- **Testing**: Vitest + React Testing Library + jsdom + `@testing-library/user-event`
- **Lint**: oxlint (`typescript-eslint` belum mendukung TypeScript 7; memaksakannya akan menggagalkan `npm install`)
- **State**: lokal React saja (tidak perlu state manager)

Justifikasi deps minimal: bootstrap cepat, bundle kecil, template mudah dijual ulang.

---

## 6. Design System (Karakter)

Menghindari kesan generik dengan palet industrial-tepercaya, tipografi tegas, dan tata letak editorial berbasis fotografi — bukan ornamen dekoratif.

### Palet (token CSS)

| Token | Nilai | Pemakaian |
| --- | --- | --- |
| `--color-ink` | `#0E1116` | Teks utama / permukaan gelap |
| `--color-surface` | `#F6F6F4` | Latar terang |
| `--color-surface-2` | `#FFFFFF` | Kartu |
| `--color-brand` | `#F59E0B` | Aksen utama (CTA, highlight) |
| `--color-brand-strong` | `#D97706` | Hover/tekan |
| `--color-muted` | `#5B6470` | Teks sekunder |
| `--color-line` | `#E4E4E0` | Garis/border |

Kontras teks memenuhi WCAG AA.

### Tipografi

- Heading: **Sora** (600/700), tracking rapat.
- Body: **Inter** (400/500).
- Skala: `display` (hero), `h2` (judul section), `lead`, `body`, `caption`.
- Aturan: heading besar hanya di Hero & judul section; hindari heading raksasa berulang.

### Spacing, bentuk, gerak

- Skala spacing kelipatan 4; section padding lega (desktop `py-24`, mobile `py-16`).
- Radius konsisten (`rounded-xl`), border halus, shadow minimal.
- Motion seperlunya: transisi hover 150–200ms, reveal halus opsional saat scroll (dengan `prefers-reduced-motion` dihormati).

---

## 7. Information Architecture (Section)

Urutan section pada satu halaman (dengan `id` anchor untuk navigasi):

1. **Navbar** (`position: sticky`) — logo teks/merek, menu (Layanan, Harga, Galeri, Lokasi, FAQ), tombol "Booking Servis". Mobile: hamburger → panel menu. Highlight section aktif.
2. **Hero** (`#beranda`) — foto bengkel besar, badge kecil, headline singkat, deskripsi, CTA "Lihat Layanan" (→ `#layanan`) dan "Booking Servis" (→ `#booking`), baris quick-facts (jam buka, lokasi singkat).
3. **Layanan** (`#layanan`) — kartu layanan: Servis Rutin, Ganti Oli, Pemeriksaan Rem, Perbaikan Mesin, Detailing. Tiap kartu: ikon, judul, deskripsi singkat, estimasi durasi.
4. **Harga** (`#harga`) — daftar harga perkiraan per layanan dengan rentang (mis. "mulai dari"), plus catatan tegas: "Harga akhir menyesuaikan kondisi kendaraan dan dapat berubah setelah pemeriksaan."
5. **Alur Servis** (`#alur`) — langkah bernomor: Booking → Konfirmasi → Pemeriksaan & Estimasi → Pengerjaan → Quality Check → Selesai/Serah Terima.
6. **Keunggulan** (`#keunggulan`) — poin faktual & terverifikasi-lokal: teknisi berpengalaman, peralatan diagnostik, ruang tunggu, transparansi estimasi sebelum pengerjaan. Tanpa superlatif yang tak terbukti.
7. **Galeri** (`#galeri`) — grid foto bengkel & hasil pekerjaan; klik membuka lightbox sederhana (opsional) atau tampilan diperbesar.
8. **Testimoni** (`#testimoni`) — kartu testimoni (nama, kendaraan, isi, rating). Ditandai sebagai **contoh/demo** agar tidak dianggap klaim nyata.
9. **Lokasi** (`#lokasi`) — alamat lengkap, jam operasional per hari, tombol "Buka di Google Maps" (URL dari config), telp.
10. **Booking** (`#booking`) — form: Nama, Nomor Kontak, Jenis Kendaraan, Layanan, Tanggal Kunjungan (+ catatan opsional). Tombol "Kirim via WhatsApp".
11. **FAQ** (`#faq`) — accordion accessible.
12. **Footer** — kontak (telp/WA/email), media sosial, alamat, jam singkat, info bisnis (nama, tahun, tagline), tautan cepat, catatan template.

Plus: tombol WhatsApp mengambang (floating) di mobile/desktop.

---

## 8. Model Konten & Tipe (Data Separation)

Semua tipe di `src/types/content.ts`. Data aktual di `src/data/*`.

```ts
export type ServiceId = string;

export interface Service {
  id: ServiceId;
  name: string;
  description: string;
  duration: string;        // mis. "±45 menit"
  icon: ServiceIcon;       // key ikon, bukan komponen
}

export interface PriceItem {
  serviceId: ServiceId;
  vehicleType: 'mobil' | 'motor' | 'umum';
  label: string;           // mis. "Ganti Oli Mesin"
  priceFrom: number;       // Rupiah
  priceTo?: number;
}

export interface ProcessStep { step: number; title: string; description: string; }

export interface Advantage { title: string; description: string; icon: ServiceIcon; }

export interface GalleryImage { src: string; alt: string; caption?: string; }

export interface Testimonial {
  name: string; vehicle: string; rating: 1|2|3|4|5; quote: string; isDemo: true;
}

export interface FaqItem { question: string; answer: string; }

export interface OpeningHour { day: string; open: string; close: string; closed?: boolean; }

export interface WorkshopInfo {
  name: string; tagline: string; description: string;
  phoneDisplay: string; phoneE164: string;   // untuk tel:
  whatsappNumber: string;                     // digit, tanpa '+' 
  whatsappDefaultMessage: string;
  email: string;
  address: { line1: string; city: string; region: string; postalCode: string; country: string };
  mapsUrl: string;
  socials: { platform: 'instagram'|'facebook'|'tiktok'|'youtube'; url: string }[];
  hours: OpeningHour[];
  businessInfo: { foundedYear: number; legalName?: string };
}

export interface NavItem { label: string; href: string; }
```

**Aturan**: komponen tidak menulis konten bisnis maupun teks tampilan utama secara literal; keduanya diimpor dari `src/data` (`workshop.ts`, `services.ts`, `pricing.ts`, `testimonials.ts`, `faq.ts`, `advantages.ts`, `process.ts`, `navigation.ts`, `images.ts`, dan `content.ts` untuk judul bagian/label/copy). Hanya label aksesibilitas teknis dan pesan validasi yang tetap di komponen/`src/lib`. `images.ts` memusatkan URL foto (hero + galeri) agar mudah diganti.

---

## 9. Arsitektur Komponen

```
src/
  data/        workshop.ts services.ts pricing.ts process.ts advantages.ts
               gallery.ts testimonials.ts faq.ts navigation.ts images.ts
  types/       content.ts
  lib/         whatsapp.ts  currency.ts  validation.ts  cn.ts
  components/
    layout/    Navbar.tsx  Footer.tsx  FloatingWhatsApp.tsx
    sections/  Hero.tsx  Services.tsx  Pricing.tsx  Process.tsx
               Advantages.tsx  Gallery.tsx  Testimonials.tsx
               Location.tsx  Booking.tsx  Faq.tsx
    ui/        Button.tsx  Container.tsx  SectionHeading.tsx  Card.tsx
               Accordion.tsx  Field.tsx  Select.tsx  SmartImage.tsx
               Badge.tsx  Icon.tsx
  App.tsx  main.tsx  index.css
```

Prinsip isolasi: tiap unit punya satu tanggung jawab, komunikasi lewat props bertipe, dapat diuji mandiri. Komponen section hanya mengorkestrasi data + komponen `ui`.

`Icon.tsx` memetakan key string → ikon SVG inline (tanpa dependensi ikon), sehingga data tetap serializable.

---

## 10. Alur Booking & WhatsApp

Modul `src/lib/whatsapp.ts`:

```ts
buildBookingMessage(input: {
  name: string; contact: string; vehicleType: string;
  serviceName: string; date: string; notes?: string;
}): string;

buildWhatsAppUrl(number: string, message: string): string; // https://wa.me/<digits>?text=<encoded>
```

- Nomor disanitasi: hanya digit.
- Pesan memuat blok berlabel: Nama, Kontak, Jenis Kendaraan, Layanan, Tanggal Kunjungan, Catatan (opsional).
- `Booking.tsx`: form terkontrol + validasi (nama & kontak wajib, jenis kendaraan & layanan wajib, tanggal wajib & >= hari ini). Validasi via `lib/validation.ts`.
- Submit yang valid → buka `buildWhatsAppUrl(...)` di tab baru → tampilkan state sukses ("Permintaan booking disiapkan di WhatsApp…"). Field **tidak** direset otomatis agar pengguna dapat mengirim ulang bila perlu; disediakan tombol "Isi ulang" manual.
- Tombol WhatsApp umum memakai `whatsappDefaultMessage`.

Catatan: WhatsApp Web/App dibuka lewat URL; tidak ada API server.

---

## 11. Aksesibilitas

- Landmark semantik (`header`, `nav`, `main`, `section` berjudul, `footer`).
- Semua gambar punya `alt` (dari data); gambar dekoratif `alt=""`.
- Accordion & menu mobile: `aria-expanded`, `aria-controls`, fokus keyboard, tutup dengan `Esc`.
- Form: `<label>` eksplisit, pesan error terhubung `aria-describedby`, `aria-invalid`.
- Fokus terlihat jelas; kontras AA; dukung `prefers-reduced-motion`.

---

## 12. Performa

- Gambar `loading="lazy"` (kecuali hero) + `decoding="async"`; `width/height` atau aspect-ratio untuk mencegah layout shift.
- `SmartImage` menampilkan placeholder ber-brand dan fallback bila URL gagal.
- Tidak ada dependensi UI berat; font `display=swap`.

---

## 13. Testing & Verifikasi

- **Unit** (Vitest):
  - `buildBookingMessage` memuat semua field & memformat pesan.
  - `buildWhatsAppUrl` meng-encode pesan dan membersihkan nomor.
  - `formatRupiah` format benar.
  - `validation` menolak input kosong / tanggal lampau.
- **Komponen** (RTL):
  - FAQ toggle (klik & keyboard) mengubah `aria-expanded`.
  - Booking: submit tanpa field wajib menampilkan error dan **tidak** membuka WA (mock `window.open`); submit valid memanggil WA dengan URL benar.
- **Build & runtime**:
  - `tsc --noEmit`, `npm run build`, jalankan `npm run dev` dan cek render + console bersih.

---

## 14. Penanganan Error & Tepi

- Nomor WA tidak valid/kosong → tombol WA menonaktifkan diri atau memberi pesan konfigurasi.
- URL foto gagal → fallback placeholder.
- Tanggal lampau → validasi menolak.
- Tidak ada anchor mati; semua `href` menuju section, `wa.me`, `tel:`, `mailto:`, atau Maps. Tautan sosial tanpa URL diisi → disembunyikan, bukan `#`.

---

## 15. Panduan Kustomisasi (untuk Klien)

Didokumentasikan di `README.md`:
1. `src/data/workshop.ts` — nama, tagline, telepon, WhatsApp, email, alamat, Maps, jam, sosial.
2. `src/data/services.ts` + `pricing.ts` — layanan & harga.
3. `src/data/images.ts` — ganti URL foto dengan foto klien.
4. `src/data/testimonials.ts`, `faq.ts`, `advantages.ts`, `process.ts`.
5. Token warna/font di `src/index.css` (`@theme`).

---

## 16. Placeholder yang Perlu Diisi Klien

- `whatsappNumber`, `phoneDisplay`/`phoneE164`, `email`.
- `address`, `mapsUrl`.
- `socials` (kosongkan yang belum ada).
- URL foto di `images.ts`.
- `legalName` & `foundedYear` bila ingin info bisnis legal.

Semua ditandai komentar `// GANTI:` di file data.

---

## 17. Kriteria Penerimaan (Acceptance)

- [ ] Struktur section lengkap sesuai §7.
- [ ] Semua konten berasal dari `src/data` (§8) — tidak ada konten literal di komponen.
- [ ] Booking + WhatsApp berfungsi; pesan memuat layanan & jenis kendaraan (§10).
- [ ] FAQ & menu mobile responsif dan accessible (§11).
- [ ] Responsif desktop & mobile; tidak ada overflow/rusak.
- [ ] Tidak ada link kosong/tombol mati (§14).
- [ ] Test unit & komponen lulus; `tsc`, `build`, `dev` sukses (§13).
- [ ] README berisi panduan kustomisasi (§15).

---

## 18. Pertanyaan Terbuka

- Nomor WhatsApp & data bisnis asli (placeholder dulu).
- Apakah perlu lightbox galeri penuh atau cukup tampilan diperbesar (default: lightbox ringan).
