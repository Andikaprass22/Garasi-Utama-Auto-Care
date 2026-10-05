# Garasi Utama Auto Care — Template Landing Page Bengkel

Landing page profesional untuk bengkel **mobil, motor, atau detailing**, dibangun dengan
**Vite + React + TypeScript + Tailwind CSS**. Dirancang sebagai template yang bisa
ditawarkan ke klien: seluruh konten (nama, layanan, harga, foto, lokasi, kontak)
dipisahkan dari komponen tampilan sehingga cukup mengedit beberapa berkas data.

Nama contoh yang dipakai: **Garasi Utama Auto Care**.

## Fitur

- Navbar sticky dengan logo, menu anchor, tombol **Booking Servis**, dan menu mobile.
- Hero dengan foto bengkel, headline, deskripsi, dan dua CTA.
- Layanan (servis rutin, ganti oli, pemeriksaan rem, perbaikan mesin, detailing).
- Daftar harga perkiraan + catatan bahwa harga akhir tergantung kondisi kendaraan.
- Alur servis 6 langkah dari booking sampai serah terima.
- Keunggulan bengkel.
- Galeri foto dengan lightbox (tutup lewat tombol atau tombol `Esc`).
- Testimoni pelanggan (ditandai sebagai contoh).
- Lokasi, jam operasional, peta, dan tombol petunjuk arah.
- Form booking dengan validasi; pesan WhatsApp otomatis memuat **layanan** dan
  **jenis kendaraan** yang dipilih.
- FAQ accordion yang bisa dibuka/tutup lewat mouse maupun keyboard.
- Footer dengan kontak, media sosial, alamat, dan info bisnis.
- Tombol WhatsApp mengambang.

## Menjalankan

```bash
npm install
npm run dev      # server pengembangan
```

Skrip lain:

```bash
npm run build      # typecheck + build produksi ke dist/
npm run preview    # pratinjau hasil build
npm run typecheck  # cek tipe TypeScript
npm run lint       # jalankan linter (oxlint)
npm run lint:fix   # linter + perbaikan otomatis
npm test           # jalankan test (Vitest)
npm run test:watch # test mode watch
```

## Struktur folder

```
src/
  data/        konten yang bisa diedit (content, workshop, services, pricing, dll)
  types/       tipe TypeScript untuk konten
  lib/         logika murni (whatsapp, currency, validation, cn)
  components/
    layout/    Navbar, Footer, FloatingWhatsApp
    sections/  Hero, Services, Pricing, Process, Advantages,
               Gallery, Testimonials, Location, Booking, Faq
    ui/        Button, Container, SectionHeading, Card, Accordion, dll
public/images/ foto demo (ganti dengan foto klien)
```

Prinsipnya: data bisnis dan teks tampilan utama diambil dari `src/data`; komponen hanya
mengatur tata letak. Sebagian label teknis (teks untuk pembaca layar) dan pesan validasi
form tetap berada di komponen / `src/lib`.

## Cara kustomisasi

| Ingin mengubah… | Edit berkas |
| --- | --- |
| Nama bengkel, tagline, deskripsi, telepon, WhatsApp, email | `src/data/workshop.ts` |
| Alamat, tautan Google Maps, peta | `src/data/workshop.ts` |
| Jam operasional | `src/data/workshop.ts` (`hours`) |
| Media sosial (kosongkan `url` untuk menyembunyikan) | `src/data/workshop.ts` (`socials`) |
| Daftar layanan | `src/data/services.ts` |
| Harga & catatan harga | `src/data/pricing.ts` |
| Alur servis | `src/data/process.ts` |
| Keunggulan | `src/data/advantages.ts` |
| Foto hero & galeri | `src/data/images.ts`, `src/data/gallery.ts`, `public/images/` |
| Testimoni | `src/data/testimonials.ts` |
| FAQ | `src/data/faq.ts` |
| Menu navigasi | `src/data/navigation.ts` |
| Semua teks tampilan: judul & deskripsi bagian, label tombol, label/placeholder form, pesan sukses, label pesan WhatsApp | `src/data/content.ts` |
| Warna & font | `src/index.css` (blok `@theme`) |

### Mengganti foto

Letakkan foto klien di `public/images/` lalu perbarui `src` pada
`src/data/images.ts` dan `src/data/gallery.ts`. Nilai `src` juga boleh berupa URL
penuh (mis. dari CDN klien). Jika sebuah gambar gagal dimuat, komponen
`SmartImage` menampilkan placeholder ber-brand — bukan gambar rusak.

Foto demo diambil dari Wikimedia Commons dan **wajib diganti** sebelum publikasi;
lihat [CREDITS.md](./CREDITS.md) untuk atribusi dan lisensinya.

### Warna & font

`src/index.css` berisi token tema Tailwind v4 pada blok `@theme`:

```css
@theme {
  --color-brand: #f59e0b;      /* warna aksen utama */
  --color-ink: #0e1116;        /* teks & permukaan gelap */
  --color-surface: #f6f6f4;    /* latar terang */
  --font-display: "Sora", ...; /* font judul */
  --font-sans: "Inter", ...;   /* font isi */
}
```

Ubah nilainya untuk menyesuaikan dengan identitas klien.

## Placeholder yang wajib diisi

Semua ditandai komentar `// GANTI:` pada berkas data:

- `whatsappNumber` — **digit saja**, tanpa `+`, spasi, atau tanda hubung (mis. `6281234567890`).
- `phoneDisplay` / `phoneE164`.
- `email`.
- `address`, `mapsUrl`, `mapsDirectionsUrl`, `mapsEmbedUrl`.
- `socials` — kosong secara default sehingga ikon media sosial disembunyikan;
  isi `url` dengan akun resmi agar ikonnya muncul di footer.
- Foto di `public/images/` + `src/data/images.ts` + `src/data/gallery.ts`.
- Testimoni asli (ganti contoh) dan `legalName` bila perlu.

## Booking & WhatsApp

- Tombol **Booking Servis** mengarah ke bagian `#booking`.
- Form memvalidasi nama, nomor kontak, jenis kendaraan, layanan, dan tanggal
  (tidak boleh sebelum hari ini).
- Setelah valid, pesan WhatsApp dibuka otomatis melalui `wa.me` dan memuat
  nama, kontak, **jenis kendaraan**, **layanan**, tanggal, serta catatan opsional.
- Jika WhatsApp tidak terbuka otomatis, tersedia tombol "Buka lagi" pada pesan sukses.

## Build & deploy

```bash
npm run build
```

Hasil build ada di `dist/` dan bisa di-host di layanan statis mana pun
(Vercel, Netlify, GitHub Pages, atau hosting biasa).

## Catatan

- Seluruh isi adalah **konten demo**. Tidak ada klaim layanan yang tidak dapat
  dibuktikan (tanpa "nomor 1", tanpa garansi yang tidak tertulis).
- Testimoni, foto, nomor, dan alamat adalah contoh dan harus diganti sebelum publikasi.
- `npm test` menegakkan beberapa aturan pada data: `whatsappNumber` harus berupa
  digit saja, dan setiap `href` di `src/data/navigation.ts` harus menunjuk ke `id`
  section yang benar-benar ada. Keduanya menjaga tombol WhatsApp dan navigasi tetap andal.
- Linter memakai **oxlint**, bukan ESLint: `typescript-eslint` belum mendukung
  TypeScript 7, sehingga memasangnya akan menggagalkan `npm install` yang bersih.
