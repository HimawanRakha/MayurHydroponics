# Rencana konten, arsitektur informasi, dan SEO

## Arsitektur informasi

| Route | H1 | Tujuan pencarian | CTA utama | Tautan internal penting |
|---|---|---|---|---|
| `/` | Sayur hidroponik dari greenhouse kami di Purwokerto | "hidroponik Purwokerto", "Mayur Hydroponics" | Pesan lewat WhatsApp | /produk, /produk#pesan, /tentang-kami, artikel, /galeri |
| `/tentang-kami` | Kebun sayur keluarga yang tumbuh menjadi usaha | Profil Mayur Hydroponics | Lihat sayur & harga | 2 artikel edukasi, /produk |
| `/produk` | Sayur hidroponik Mayur dan harganya | "sayur hidroponik Purwokerto", harga | Kirim pesanan lewat WhatsApp | artikel katalog |
| `/publikasi` | Catatan dari kebun Mayur | Informasi & edukasi | — | semua artikel |
| `/publikasi/[slug]` | Judul artikel | Pertanyaan spesifik artikel | Susun pesanan / Tanya lewat WhatsApp | artikel terkait, /produk |
| `/galeri` | Galeri kebun Mayur | Bukti visual | Lihat harga sayur | /produk, Instagram |
| `/kontak` | Hubungi Mayur Hydroponics | Lokasi & kontak | Chat di WhatsApp | Google Maps, Instagram |

Urutan section beranda: hero → cerita keluarga → daftar sayur (lembar spesimen) → proses (semai → greenhouse → panen berakar → kemas & antar) → alasan greenhouse tertutup → kemitraan → publikasi → preview galeri → pesan & lokasi → footer.

Section yang sengaja **tidak** dibuat karena belum ada data: testimoni, logo mitra, statistik terkini, jam operasional, peta dengan pin.

## Cara menerbitkan artikel baru

1. Buat file `src/content/articles/<slug>.md`. Nama file = URL (`/publikasi/<slug>`), hanya huruf kecil, angka, tanda hubung. **Jangan ganti nama file artikel yang sudah terbit**; bila terpaksa, tambahkan redirect permanen di `next.config.ts` (`redirects()`).
2. Isi frontmatter:

```yaml
---
title: "Judul spesifik, sentence case"
excerpt: "Ringkasan 40–220 karakter yang tampil di kartu dan meta description."
coverImage: lorongGreenhouse   # key dari src/lib/images.ts
publishedAt: "2026-11-01"
updatedAt: "2026-11-05"        # opsional
category: "Kegiatan Mayur"     # Kegiatan Mayur | Edukasi Hidroponik | Produk dan Panen | Cerita Usaha | Kolaborasi dan Berita
author: "Nama Penulis"         # opsional; tanpa ini penulis = Mayur Hydroponics
status: draft                  # ganti ke published saat siap tayang
seoTitle: "Opsional, maks. 70 karakter"
seoDescription: "Opsional, maks. 170 karakter"
instagramUrl: "https://www.instagram.com/p/..."   # opsional, tautan ke postingan terkait
---
```

3. Foto baru: taruh di `src/assets/images/...`, daftarkan di `src/lib/images.ts` dengan alt yang menjelaskan isi foto.
4. Jalankan `npm run build`. Frontmatter yang salah menghentikan build dengan pesan yang menjelaskan field mana yang keliru.
5. Hanya artikel `status: published` yang tampil di website, sitemap, dan halaman publikasi. Kategori hanya muncul di filter bila punya artikel.

## Memperbarui harga dan produk

Edit `src/lib/products.ts` (harga, berat, urutan) dan `catalogLabel` bila katalog baru terbit. Fakta bisnis lain (WhatsApp, alamat, promo, catatan S&K) ada di `src/lib/site-config.ts`.

## Artikel awal (perlu ditinjau pemilik sebelum go-live)

| Slug | Pilar | Sumber isi |
|---|---|---|
| `apa-itu-hidroponik` | Edukasi | Profil 2022 hlm. 2 (definisi KBBI, 3 alasan) |
| `kenapa-sayur-mayur-ditanam-di-greenhouse-tertutup` | Dokumentasi operasional | Profil 2022 hlm. 3–4 |
| `katalog-sayur-hidroponik-mayur-2025` | Produk & panen | Katalog 2025 |

Ketiganya bertanggal 14 Oktober 2026 dan berstatus `published`. Ubah ke `draft` bila belum disetujui.

## Pilar konten dan ide artikel berikutnya

Setiap ide butuh bahan dari pemilik (foto asli, data, cerita). Jangan diterbitkan tanpa itu.

| Pilar | Ide | Bahan yang dibutuhkan |
|---|---|---|
| Brand & usaha | Satu hari di kebun Mayur | Foto kegiatan pagi, cerita pemilik |
| Produk & panen | Cara menyimpan sayur hidroponik berakar agar awet | Pengalaman/uji pemilik |
| Produk & panen | Resep sederhana dari sayur Mayur | Foto masakan asli (profil 2022 hlm. 7 punya contoh) |
| Edukasi | Netpot, rockwool, dan nutrisi: perlengkapan dasar hidroponik | Foto perlengkapan di kebun |
| Operasional | Dari semai ke panen: berapa lama tiap sayur tumbuh? | Data siklus tanam pemilik |
| Lokal | Area pengantaran dan jadwal antar di Purwokerto | Jadwal resmi |
| Kemitraan | Cerita mitra reseller/toko | Izin mitra untuk disebut |

Hindari artikel tipis yang hanya mengulang "hidroponik Purwokerto". Lebih baik sedikit artikel dengan foto asli.

## Hubungan dengan Instagram

- Pasang tautan website di bio Instagram (beranda, atau `/produk` untuk pemesanan).
- Saat memposting kegiatan, tulis versi lengkapnya sebagai artikel dan isi `instagramUrl` agar keduanya saling menaut.
- Website tidak menyematkan feed Instagram (berat dan rawan berubah).

## SEO lokal: langkah setelah deploy

1. Set `NEXT_PUBLIC_SITE_URL` ke domain final, deploy ulang.
2. Google Search Console: verifikasi domain (DNS atau `GOOGLE_SITE_VERIFICATION`), submit `https://domain/sitemap.xml`, periksa *Page indexing*.
3. Google Business Profile (bila pemilik berwenang): nama persis "Mayur Hydroponics", kategori yang sesuai aktivitas (mis. penjual sayur/kebun), alamat yang sama dengan website, nomor 0815-6976-844, tautan website, foto asli. Bila lokasi tidak melayani kunjungan bebas, atur sebagai *service-area business* dengan area Purwokerto.
4. Minta ulasan pelanggan secara wajar; jangan membuat atau membeli ulasan.
5. Konsistensi NAP (nama, alamat, telepon) di Instagram, Google, dan website.
6. Cari penyebutan sah dari sumber lokal (komunitas, media lokal, mitra toko).
7. Pantau bulanan di Search Console: query, impresi, klik, CTR, posisi. Perbarui artikel yang mendapat impresi tetapi CTR rendah.
8. Uji Core Web Vitals dengan PageSpeed Insights (mobile & desktop) setelah domain aktif.
9. Validasi structured data dengan Rich Results Test / Schema Markup Validator.

Posisi di Google adalah hasil yang perlu dipantau, bukan dijamin oleh implementasi ini.
