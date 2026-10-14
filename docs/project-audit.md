# Audit proyek dan keputusan teknis

Tanggal: 14 Oktober 2026.

## Kondisi awal repository

- Folder proyek **belum berisi kode**: hanya `Asset Project Website/` (foto, PDF profil 2022, katalog 2025, logo) dan `.claude/skills/` (8 design skill).
- Tidak ada `package.json`, CMS, database, API, font, atau stylesheet yang perlu dipertahankan.
- Bukan repository git. Git sengaja tidak diinisialisasi; silakan jalankan `git init` bila ingin versioning.

## Stack yang dipasang

| Bagian | Pilihan | Catatan |
|---|---|---|
| Framework | Next.js 16.4.0 (App Router, Turbopack) | Dibuat dengan `create-next-app@latest`. `cacheComponents` + `partialPrefetching` aktif (default template) |
| Bahasa | TypeScript 5, React 19.3 | `tsc --noEmit` bersih |
| Styling | Tailwind CSS v4 | Token di `src/app/globals.css` |
| Font | `next/font/google`: Bricolage Grotesque (judul), Figtree (teks) | Di-self-host saat build, `display: swap` |
| Konten | Markdown: frontmatter diparse `yaml`, isi dirender `marked`, divalidasi `zod` | Lihat `docs/content-plan.md`. `npm audit --omit=dev`: 0 kerentanan |
| Gambar | `next/image` dengan impor statis | Dimensi otomatis → tanpa layout shift |
| Lint | ESLint 9 + `eslint-config-next` | Bersih |

Tidak ada library animasi, UI kit, atau state manager. JavaScript klien hanya untuk: menu mobile, penanda menu aktif, filter kategori publikasi, dan penyusun pesanan WhatsApp.

## Catatan khusus Next.js 16.4

- `params` adalah Promise. Halaman artikel membungkus pembacaan `params` dalam `<Suspense>` sesuai validasi *instant navigation*. Semua slug yang terbit diprerender lewat `generateStaticParams`, jadi isi artikel tetap ada di HTML statis.
- Slug yang tidak dikenal: request pertama dijawab HTTP 200 berisi halaman "tidak ditemukan" dengan `<meta name="robots" content="noindex">` (perilaku streaming Next.js), request berikutnya 404. Aman untuk SEO karena `noindex`. Bila suatu saat butuh 404 keras di request pertama, tambahkan pengecekan slug di `src/proxy.ts`.
- `new Date()` tidak boleh dipanggil saat prerender; tahun copyright dihitung di komponen `"use cache"` (`SiteFooter.tsx`) dengan `cacheLife("days")`, sehingga halaman revalidasi harian.
- Konten Markdown dibaca dengan `fs.readFileSync` (nilai "predictable" yang ikut ke static shell).

## Struktur

```text
src/
  app/                 routes: /, /tentang-kami, /produk, /publikasi, /publikasi/[slug], /galeri, /kontak
                       + not-found, sitemap.ts, robots.ts, opengraph-image.jpg, icon.png
  components/layout/   SiteHeader, NavLinks, MobileNavigation, SiteFooter, PageIntro (breadcrumb + H1)
  components/product/  ProductSpecimens (katalog), OrderBuilder (susun pesanan WhatsApp)
  components/publication/ ArticleCard, ArticleList (filter kategori)
  components/ui/       primitives: Container, ButtonLink, WhatsAppButton, ikon, TermsNote, JsonLd
  content/articles/    artikel Markdown
  lib/                 site-config (sumber kebenaran fakta bisnis), products, images, publications, seo
  assets/images/       foto teroptimasi (dibuat oleh scripts/prepare-images.py)
scripts/
  prepare-images.py    membuat salinan web dari aset asli + OG image
  qa-crawl.mjs         crawl QA (status, H1, title/description unik, canonical, alt, JSON-LD, tautan)
```

## Verifikasi fakta bisnis

Fakta diambil dari PROFILE 2022.pdf, katalog 2025, dan bio Instagram. Pada 14 Oktober 2026 pemilik proyek mengonfirmasi lewat chat:

| Fakta | Keputusan pemilik |
|---|---|
| WhatsApp | Hanya **0815-6976-844** (sesuai katalog 2025 & bio IG) |
| Harga katalog 2025 | Ditampilkan, dengan catatan dapat berubah |
| Alamat Perumahan Puri Hijau Pumas 17 No. 1, Karangklesem, Purwokerto Selatan | Boleh ditampilkan dan bisa dikunjungi |
| Gratis ongkir Purwokerto min. 4 bungkus | Masih berlaku |
| Mitra reseller (min. 10 bungkus) & konsinyasi | Masih berlaku |
| Kapasitas "per Mei 2021: 2 greenhouse, 3.200 lubang tanam, 200+ kemasan/pekan" & LED grow light | Boleh ditampilkan, selalu dengan tanggalnya |
| Semua promo | Wajib disertai "syarat dan ketentuan berlaku, dapat berubah sewaktu-waktu" (`siteConfig.termsNote`) |
| Klaim "bebas pestisida kimia" | Berasal dari profil 2022 dan bio Instagram pemilik |

Yang **tidak** ditampilkan karena belum ada data: jam operasional, tahun berdiri resmi, testimoni, sertifikasi, koordinat peta (hanya tautan pencarian Google Maps berdasarkan alamat, tanpa pin buatan), nama pengelola.

## Hasil QA (build produksi, 14 Oktober 2026)

| Pemeriksaan | Hasil |
|---|---|
| `npm run build` | Berhasil, 17 route statis/PPR |
| `tsc --noEmit`, `eslint src scripts` | Bersih |
| `node scripts/qa-crawl.mjs http://localhost:3100` | 9 halaman, 34 aset, **0 masalah**: semua 200, tepat satu H1, title & description unik, canonical benar, `og:image` ada, semua `img` ber-alt, JSON-LD valid, tidak ada tautan `#`, tautan eksternal `target="_blank" rel="noopener"` |
| 404 | `/halaman-tidak-ada` → 404; slug artikel tak dikenal → 200 + noindex (lihat catatan di atas) |
| Menu mobile | Buka, Escape menutup & fokus kembali ke tombol, klik tautan menutup & berpindah halaman |
| Susun pesanan | Pesan WhatsApp terisi benar; logika gratis ongkir (≥4 bungkus) benar |
| Lab performa (localhost, viewport 375px) | CLS 0; LCP ~1,75 dtk (elemen H1). Ini **bukan** angka Core Web Vitals lapangan; uji ulang dengan PageSpeed Insights setelah deploy |

## Belum dikerjakan / butuh keputusan

1. **Domain produksi.** Set `NEXT_PUBLIC_SITE_URL` (mis. `https://domain-anda`) di hosting. Tanpa itu canonical, sitemap, dan OG mengarah ke `http://localhost:3000`.
2. **Hosting.** Proyek siap untuk Vercel atau server Node.js (`npm run build && npm start`). Cache Components membutuhkan runtime Node.js, bukan static export.
3. **Google Search Console.** Set `GOOGLE_SITE_VERIFICATION` atau verifikasi lewat DNS, lalu submit `/sitemap.xml`.
4. **Google Business Profile.** Lihat checklist di `docs/content-plan.md`.
5. HTTPS dan redirect HTTP→HTTPS diatur di level hosting.
