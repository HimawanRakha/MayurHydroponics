# Mayur Hydroponics — website resmi

Company profile, katalog sayur, dan publikasi untuk Mayur Hydroponics, Purwokerto. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build produksi
npm start          # menjalankan hasil build
npm run lint
```

## Variabel lingkungan

Salin `.env.example` menjadi `.env.local` (lokal) atau isi di pengaturan hosting.

| Nama | Wajib | Fungsi |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Ya, di produksi | Domain final, tanpa garis miring di akhir. Dipakai untuk canonical, sitemap, Open Graph, JSON-LD |
| `GOOGLE_SITE_VERIFICATION` | Tidak | Kode verifikasi Google Search Console (metode tag HTML) |

## Mengubah konten

- **Fakta bisnis** (WhatsApp, alamat, promo, catatan S&K): `src/lib/site-config.ts`
- **Harga & daftar sayur**: `src/lib/products.ts`
- **Artikel**: `src/content/articles/*.md`
- **Foto**: `src/assets/images/` + daftar alt text di `src/lib/images.ts`. Salinan web dari aset asli dibuat ulang dengan `npm run images` (butuh Python + Pillow)

## Pemeriksaan kualitas

```bash
npm run build && npm start   # di terminal lain:
npm run qa                   # crawl semua halaman di http://localhost:3000
```

## Catatan

Dokumen audit (`docs/`), aset mentah ("Asset Project Website/"), dan konfigurasi agen AI (`.claude/`) hanya disimpan lokal dan tidak masuk repository. `npm run images` membutuhkan folder aset mentah tersebut.
