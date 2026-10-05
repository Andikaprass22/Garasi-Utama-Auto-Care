# Garasi Utama Auto Care — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun landing page template bengkel kendaraan (Vite + React + TypeScript) yang data-driven, berkarakter, responsif, dan booking-nya terhubung ke WhatsApp.

**Architecture:** Single-page React dengan konten 100% terpisah di `src/data/*` dan tipe di `src/types/content.ts`. Komponen `ui/` primitif tanpa konten, section di `components/sections/` mengorkestrasi data. Logika murni (pesan WhatsApp, harga, validasi) di `src/lib/` agar mudah diuji. Tailwind v4 dengan token tema di `@theme`.

**Tech Stack:** Vite 5+, React 18, TypeScript (strict), Tailwind CSS v4 (`@tailwindcss/vite`), Vitest + React Testing Library + jsdom, oxlint.

**Spec:** `docs/superpowers/specs/2026-10-05-garasi-utama-auto-care-landing-design.md`

## Global Constraints

- Bahasa konten: Indonesia. Mata uang: Rupiah (`formatRupiah` → `Rp`).
- Nomor WhatsApp disimpan sebagai digit (tanpa `+`, tanpa spasi) di `src/data/workshop.ts`.
- **DILARANG auto-commit** (instruksi user). Tidak ada langkah `git commit`; setiap task berakhir saat test/verifikasi hijau.
- Tidak ada konten literal di komponen — semua dari `src/data/*`.
- Tidak ada `href="#"` mati; tautan sosial tanpa URL disembunyikan.
- Target kontras WCAG AA; hormati `prefers-reduced-motion`.
- Versi floor: React ≥18.3, TypeScript ≥5.4, Vite ≥5.4, Tailwind ≥4.0.

## Review Focus

- **Nomor WA tidak valid/kosong:** `buildWhatsAppUrl` harus membersihkan non-digit dan menghasilkan URL `wa.me` yang benar; tombol WA menonaktifkan diri bila kosong (Task 3, Task 8).
- **Tanggal lampau / kosong:** `validateBooking` harus menolak; `input type="date"` memakai `min` = hari ini (Task 3, Task 8).
- **URL foto mati:** `SmartImage` menampilkan fallback ber-brand, bukan gambar rusak (Task 4).
- **Submit form invalid:** tidak boleh membuka WhatsApp (mock `window.open` tidak terpanggil) — hanya menampilkan error (Task 8).
- **Navigasi keyboard FAQ:** toggle via Enter/Space mengubah `aria-expanded` (Task 4, Task 8).

---

### Task 1: Scaffold proyek + Tailwind v4 + tema

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`
- Create: `vitest.config.ts` (atau gabung ke `vite.config.ts`), `src/test/setup.ts`

**Interfaces:**
- Produces: skrip npm `dev`, `build`, `preview`, `test`, `lint`, `typecheck`; token CSS `--color-ink`, `--color-surface`, `--color-surface-2`, `--color-brand`, `--color-brand-strong`, `--color-muted`, `--color-line`; util kelas `container-x` opsional.

- [ ] **Step 1: Scaffold Vite React-TS** — jalankan `npm create vite@latest . -- --template react-ts` di root proyek (folder sudah kosong kecuali `docs/`). Verifikasi `src/App.tsx` & `src/main.tsx` ada.
- [ ] **Step 2: Install deps** — `npm install`; lalu `npm install -D tailwindcss @tailwindcss/vite vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`.
- [ ] **Step 3: Konfigurasi Tailwind & Vitest** — tambahkan plugin `@tailwindcss/vite` di `vite.config.ts`; set `test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'], globals: true }`.
- [ ] **Step 4: Tulis tema di `src/index.css`** — `@import "tailwindcss";` lalu blok `@theme { --color-ink:#0E1116; --color-surface:#F6F6F4; --color-surface-2:#FFFFFF; --color-brand:#F59E0B; --color-brand-strong:#D97706; --color-muted:#5B6470; --color-line:#E4E4E0; --font-display:"Sora",...; --font-sans:"Inter",... }` + `@media (prefers-reduced-motion: reduce)`.
- [ ] **Step 5: Tambah font** — `<link>` Google Fonts Sora+Inter (`display=swap`) di `index.html`.
- [ ] **Step 6: Tambah skrip** — `typecheck: tsc --noEmit`, `test: vitest run`, `test:watch: vitest`.
- [ ] **Step 7: Verifikasi** — `npm run typecheck` dan `npm run build` sukses.

---

### Task 2: Tipe konten + data terpusat

**Files:**
- Create: `src/types/content.ts`, `src/data/workshop.ts`, `src/data/services.ts`, `src/data/pricing.ts`, `src/data/process.ts`, `src/data/advantages.ts`, `src/data/gallery.ts`, `src/data/testimonials.ts`, `src/data/faq.ts`, `src/data/navigation.ts`, `src/data/images.ts`
- Test: `src/data/data.test.ts`

**Interfaces:**
- Produces: `WorkshopInfo`, `Service`, `PriceItem`, `ProcessStep`, `Advantage`, `GalleryImage`, `Testimonial`, `FaqItem`, `NavItem`, `IconName` (dari `types/content.ts`); konstanta `workshop`, `services`, `pricing`, `pricingNote`, `processSteps`, `advantages`, `gallery`, `testimonials`, `faqItems`, `navItems`, `images`.

- [ ] **Step 1: Tulis test integritas data** — `data.test.ts`: `services.length >= 5`; setiap `PriceItem.serviceId` ada di `services`; setiap `Testimonial.isDemo === true`; `workshop.whatsappNumber` hanya digit; `navItems` semua `href` dimulai `#` dan id-nya ada di daftar section; `faqItems.length >= 4`.
- [ ] **Step 2: Jalankan test → GAGAL** — `npm run test` (modul belum ada).
- [ ] **Step 3: Tulis `types/content.ts`** — semua interface sesuai spec §8 + `export type IconName = 'wrench'|'oil'|'brake'|'engine'|'sparkle'|'shield'|'clock'|'tools'|'car'|'phone'|'map'|'check'|'star'|'whatsapp'|'calendar'|'user'|'chevron'|'menu'|'close'|'instagram'|'facebook'|'tiktok'|'youtube'|'gauge'|'sofa'|'receipt'`.
- [ ] **Step 4: Tulis data** — layanan: Servis Rutin, Ganti Oli, Pemeriksaan Rem, Perbaikan Mesin, Detailing; harga perkiraan rentang wajar; 6 langkah proses; 4 keunggulan faktual; 6 foto galeri; 4 testimoni ditandai demo; 6 FAQ; `workshop` memakai placeholder jelas (`// GANTI:`). Semua ikon/sosial mengacu pada `IconName`.
- [ ] **Step 5: Jalankan test → LULUS.**

---

### Task 3: Logika murni (`lib/`)

**Files:**
- Create: `src/lib/cn.ts`, `src/lib/currency.ts`, `src/lib/whatsapp.ts`, `src/lib/validation.ts`
- Test: `src/lib/currency.test.ts`, `src/lib/whatsapp.test.ts`, `src/lib/validation.test.ts`

**Interfaces:**
- Produces:
  - `cn(...classes: Array<string | false | null | undefined>): string`
  - `formatRupiah(value: number): string`; `formatPriceRange(from: number, to?: number): string`
  - `sanitizePhoneNumber(input: string): string`; `buildBookingMessage(input: BookingMessageInput): string`; `buildWhatsAppUrl(number: string, message: string): string`; `interface BookingMessageInput { name: string; contact: string; vehicleType: string; serviceName: string; date: string; notes?: string }`
  - `interface BookingFormValues { name: string; contact: string; vehicleType: string; serviceId: string; date: string; notes: string }`; `type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>`; `validateBooking(values: BookingFormValues, today?: Date): BookingFormErrors`; `isTodayOrLater(date: string, today?: Date): boolean`

- [ ] **Step 1: Test `formatRupiah`/`formatPriceRange`** — `150000 → "Rp150.000"`, `formatPriceRange(150000, 350000) → "Rp150.000 – Rp350.000"`, tanpa `to` → `"mulai Rp150.000"`.
- [ ] **Step 2: Test WhatsApp** — `sanitizePhoneNumber("+62 812-345") → "62812345"`; `buildBookingMessage` memuat `Layanan:`, `Jenis Kendaraan:`, nama, tanggal; `buildWhatsAppUrl("62812","Halo Dunia")` → `https://wa.me/62812?text=Halo%20Dunia`.
- [ ] **Step 3: Test validasi** — semua field kosong → 5 error; tanggal lampau ditolak; tanggal hari ini diterima.
- [ ] **Step 4: Jalankan → GAGAL.**
- [ ] **Step 5: Implementasi keempat modul.**
- [ ] **Step 6: Jalankan → LULUS.**

---

### Task 4: Primitif UI

**Files:**
- Create: `src/components/ui/{Container,SectionHeading,Button,Card,Badge,Icon,SmartImage,Field,Select,Accordion}.tsx`
- Test: `src/components/ui/Accordion.test.tsx`, `src/components/ui/SmartImage.test.tsx`

**Interfaces:**
- Consumes: `IconName`, `cn`.
- Produces:
  - `Icon({ name: IconName; className?: string })` — SVG inline, `aria-hidden`.
  - `SmartImage({ src: string; alt: string; className?: string; eager?: boolean; fallbackLabel?: string })` — fallback saat `onError`.
  - `Accordion({ items: { question: string; answer: string }[]; allowMultiple?: boolean })` — tombol `aria-expanded` + panel `role="region"`.
  - `Button` — varian `primary|secondary|ghost`, elemen `<a>` bila `href`, `<button>` bila `onClick`; `SectionHeading({ eyebrow?, title, description?, align? })`; `Container`, `Card`, `Badge`, `Field` (label+error+aria), `Select` (options).

- [ ] **Step 1: Tulis test Accordion** — klik toggle mengubah `aria-expanded` `false→true`; Enter pada fokus juga membuka.
- [ ] **Step 2: Tulis test SmartImage** — `fireEvent.error(img)` → muncul fallback (teks `fallbackLabel`).
- [ ] **Step 3: Jalankan → GAGAL.**
- [ ] **Step 4: Implementasi semua primitif.**
- [ ] **Step 5: Jalankan → LULUS.**

---

### Task 5: Layout (Navbar, Footer, FloatingWhatsApp)

**Files:**
- Create: `src/components/layout/{Navbar,Footer,FloatingWhatsApp}.tsx`
- Test: `src/components/layout/Navbar.test.tsx`

**Interfaces:**
- Consumes: `workshop`, `navItems`, `buildWhatsAppUrl`, `Button`, `Container`, `Icon`.
- Produces: `Navbar` (sticky, menu mobile dengan `aria-expanded`, highlight section via `IntersectionObserver`, CTA "Booking Servis" → `#booking`); `Footer` (kontak, sosial hanya yang ber-URL, alamat, info bisnis, tautan cepat); `FloatingWhatsApp` (tombol WA memakai `whatsappDefaultMessage`).

- [ ] **Step 1: Test Navbar** — tombol hamburger punya `aria-expanded=false`; setelah klik → `true`; CTA "Booking Servis" `href="#booking"`.
- [ ] **Step 2: Jalankan → GAGAL.**
- [ ] **Step 3: Implementasi ketiga komponen.**
- [ ] **Step 4: Jalankan → LULUS.**

---

### Task 6: Sections 1 (Hero, Layanan, Harga, Alur, Keunggulan)

**Files:**
- Create: `src/components/sections/{Hero,Services,Pricing,Process,Advantages}.tsx`

**Interfaces:**
- Consumes: `images`, `services`, `pricing`, `pricingNote`, `processSteps`, `advantages`, UI primitives.
- Produces: section dengan `id` `beranda`, `layanan`, `harga`, `alur`, `keunggulan`.

- [ ] **Step 1: Implementasi Hero** — foto (eager), badge, headline, deskripsi, CTA "Lihat Layanan"→`#layanan` & "Booking Servis"→`#booking`, quick-facts jam/lokasi.
- [ ] **Step 2: Implementasi Layanan & Harga** — grid kartu layanan; tabel harga gaya menu + catatan `pricingNote`.
- [ ] **Step 3: Implementasi Alur & Keunggulan** — langkah bernomor; grid keunggulan dengan ikon.
- [ ] **Step 4: Verifikasi** — `npm run typecheck` & `npm run build` sukses.

---

### Task 7: Sections 2 (Galeri, Testimoni, Lokasi)

**Files:**
- Create: `src/components/sections/{Gallery,Testimonials,Location}.tsx`

**Interfaces:**
- Consumes: `gallery`, `testimonials`, `workshop`, `SmartImage`, UI primitives.
- Produces: section `id` `galeri`, `testimoni`, `lokasi` (termasuk lightbox ringan galeri, tombol Maps, tabel jam buka).

- [ ] **Step 1: Implementasi Galeri** — grid `SmartImage` + lightbox ringan (tutup `Esc`).
- [ ] **Step 2: Implementasi Testimoni** — kartu nama/kendaraan/rating/quote + label "contoh".
- [ ] **Step 3: Implementasi Lokasi** — alamat, jam per hari, telp (`tel:`), tombol "Buka di Google Maps".
- [ ] **Step 4: Verifikasi** — `npm run typecheck` & `npm run build` sukses.

---

### Task 8: Booking + FAQ (interaksi inti)

**Files:**
- Create: `src/components/sections/{Booking,Faq}.tsx`
- Test: `src/components/sections/Booking.test.tsx`, `src/components/sections/Faq.test.tsx`

**Interfaces:**
- Consumes: `services`, `workshop`, `validateBooking`, `buildBookingMessage`, `buildWhatsAppUrl`, `Accordion`, `Field`, `Select`, `Button`.
- Produces: section `id` `booking`, `faq`.

- [ ] **Step 1: Test Booking (invalid)** — submit kosong → error muncul, `window.open` tidak dipanggil.
- [ ] **Step 2: Test Booking (valid)** — isi lengkap → `window.open` dipanggil dengan URL `https://wa.me/<nomor>?...` berisi layanan & jenis kendaraan; state sukses tampil.
- [ ] **Step 3: Test FAQ** — render `Accordion` dengan `faqItems`; toggle bekerja.
- [ ] **Step 4: Jalankan → GAGAL.**
- [ ] **Step 5: Implementasi `Booking` & `Faq`** — `date` `min`=hari ini; tombol WA umum; tombol "Isi ulang".
- [ ] **Step 6: Jalankan → LULUS.**

---

### Task 9: Wiring App, aksesibilitas, README, verifikasi akhir

**Files:**
- Modify: `src/App.tsx`, `src/main.tsx`, `index.html`
- Create: `README.md`

**Interfaces:**
- Consumes: semua section + layout.

- [ ] **Step 1: Susun `App.tsx`** — `<Navbar/><main>{sections}</main><Footer/><FloatingWhatsApp/>` dengan urutan sesuai spec §7, `lang="id"`, skip-link.
- [ ] **Step 2: Rapikan `index.html`** — title/description dari merek, `lang="id"`, meta viewport, favicon.
- [ ] **Step 3: Tulis `README.md`** — cara install/run/build/test + panduan kustomisasi data (spec §15) + daftar placeholder (§16).
- [ ] **Step 4: Verifikasi final** — `npm run test` LULUS, `npm run typecheck` bersih, `npm run build` sukses, `npm run dev` render tanpa error console, cek tidak ada `href="#"`, matikan dev server.

---

## Self-Review

- **Spec coverage:** §7 sections → Task 6/7/8; §8 data → Task 2; §10 WA → Task 3/8; §11 a11y → Task 4/5/8/9; §13 testing → tiap task; §15 README → Task 9. ✔
- **Type consistency:** `BookingMessageInput`/`BookingFormValues`/`validateBooking`/`buildWhatsAppUrl`/`IconName` konsisten antar task. ✔
- **Review Focus:** tiap baris sudah dipetakan ke test di Task 3, 4, 8. ✔
- **Catatan:** sesuai instruksi user, **tidak ada langkah commit**.
