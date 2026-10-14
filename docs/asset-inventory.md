# Inventaris aset Mayur Hydroponics

Tanggal: 14 Oktober 2026. Semua file asli tetap utuh di `Asset Project Website/`. Salinan web dibuat dengan `python scripts/prepare-images.py` ke `src/assets/images/` (foto, diimpor statis oleh `next/image`) dan `public/logo/`.

## Sumber dan status izin

| Sumber | Akses | Catatan |
|---|---|---|
| `Asset Project Website/` (folder lokal) | Lengkap | Disediakan pemilik proyek untuk website ini. Status izin: **diberikan pemilik** |
| Instagram @mayurhydroponics | Sebagian | Bio publik terbaca (alamat "Perum Puri Hijau P17/1 Purwokerto", WA 0815…, "Sedia sayuran segar hidroponik, bebas pestisida, sehat, dan bernutrisi", 108 pengikut, highlight "Katalog Maret 22"). Daftar postingan memerlukan login dan **tidak** diakses. Tidak ada foto yang diambil dari Instagram |

## Dokumen

| Asset ID | File/path | Type | Source | Subject | Content context | Intended usage | Permission status | Quality | SEO metadata |
|---|---|---|---|---|---|---|---|---|---|
| DOC-01 | `Asset Project Website/PROFILE 2022.pdf` | PDF, 10 halaman | Pemilik | Company profile 2022 | Cerita awal (pandemi), definisi hidroponik, alasan greenhouse tertutup, kapasitas per Mei 2021, katalog Jan 2022, promo ongkir, kemitraan, kontak & alamat | Sumber fakta untuk copy semua halaman | Diberikan pemilik | Halaman raster 1240×1753 (CMYK) | — |
| DOC-02 | `Asset Project Website/katalog mayur 2025 2.jpg` | Gambar katalog | Pemilik | Katalog 2025, 10 sayur + harga | Harga & berat per bungkus, gratis ongkir Purwokerto min. 4 pcs, WA & IG | Data `src/lib/products.ts`; foto bayam hijau (dipotong) | Diberikan pemilik | 2484×3511 | — |

## Logo

| Asset ID | File/path | Type | Source | Subject | Content context | Intended usage | Permission status | Quality | SEO metadata |
|---|---|---|---|---|---|---|---|---|---|
| LOGO-01 | `logo_mayur-removebg-preview.png` → `public/logo/mayur-hydroponics-logo.png` | Logo PNG transparan | Pemilik | Tiga daun + cincin air + wordmark | Identitas merek | Header (124px), JSON-LD `logo`, OG image | Diberikan pemilik | 719×347, cukup untuk layar; **perlu versi vektor (SVG/AI) untuk cetak & tampilan besar** | alt kosong di header karena tautan ber-`aria-label` |
| LOGO-02 | `public/logo/mayur-mark.png`, `src/app/icon.png`, `src/app/apple-icon.png` | Ikon | Dipotong dari LOGO-01 | Tanda daun saja | Favicon | Favicon & ikon perangkat | Turunan LOGO-01 | 512×512 | — |

## Foto kebun

| Asset ID | File/path (web) | Type | Source | Subject | Content context | Intended usage | Permission status | Quality | SEO metadata |
|---|---|---|---|---|---|---|---|---|---|
| KBN-01 | `kebun/lorong-greenhouse-mayur-hydroponics.jpg` (asli `IMG_0170.jpg`) | Foto | Folder "Foto Mayur kebun" | Lorong greenhouse, pokcoy di kiri-kanan | Pembesaran | Hero beranda, galeri, OG image | Diberikan pemilik | 3024² → 2000², tajam | alt: "Lorong di dalam greenhouse Mayur Hydroponics dengan deretan pipa hidroponik penuh pokcoy…" |
| KBN-02 | `kebun/greenhouse-mayur-tampak-luar.jpg` (`IMG_0052.jpg`) | Foto | sda | Bangunan greenhouse dari luar | Fasilitas | Sampul artikel greenhouse, tentang kami, galeri | Diberikan pemilik | 4032×3024 → 2000×1500 | alt: "Bangunan greenhouse Mayur Hydroponics berdinding plastik bening…" |
| KBN-03 | `kebun/selada-butterhead-dan-selada-merah-di-greenhouse.jpg` (`IMG_0146.jpg`) | Foto | sda | Butterhead & selada merah | Tanaman | Preview galeri beranda, galeri | Diberikan pemilik | 2548×3398 → 1500×2000 | alt deskriptif |
| KBN-04 | `kebun/barisan-selada-hijau-dan-merah.jpg` (`IMG_0152.jpg`) | Foto | sda | Tiga baris selada dari atas | Tanaman | Preview galeri beranda, galeri | Diberikan pemilik | 3024² → 2000² | alt deskriptif |
| KBN-05 | `kebun/bibit-kangkung-di-netpot.jpg` (`IMG_0160.jpg`) | Foto | sda | Bibit kangkung di netpot | Semai/pindah tanam | Sampul artikel "Apa itu hidroponik", tentang kami, galeri | Diberikan pemilik | 2862² → 2000² | alt deskriptif |
| KBN-06 | `kebun/pokcoy-panen-dalam-keranjang.jpg` (`86895.jpg`) | Foto | sda | Pokcoy dalam keranjang | Panen | Sampul artikel katalog, produk (kemitraan), galeri | Diberikan pemilik | 1290×2296 → 1124×2000 | alt deskriptif |

## Foto dari profil 2022 (dipotong dari halaman PDF)

Resolusi rendah karena berasal dari halaman PDF raster; hanya dipakai di ukuran kecil. **Mohon file asli bila masih ada.**

| Asset ID | File/path (web) | Type | Source | Subject | Content context | Intended usage | Permission status | Quality | SEO metadata |
|---|---|---|---|---|---|---|---|---|---|
| PRF-01 | `profil/keluarga-mayur-hydroponics.jpg` | Foto | DOC-01 hlm. 1 | Empat anggota keluarga di depan spanduk Mayur | Cerita usaha | Beranda (cerita), tentang kami | Diberikan pemilik (dimuat di profil perusahaan) | 561×228, rendah | alt: "Empat anggota keluarga Mayur Hydroponics berdiri di depan spanduk…" |
| PRF-02 | `profil/led-grow-light-malam-hari.jpg` | Foto | DOC-01 hlm. 4 | Meja tanam dengan LED ungu | LED grow light | Band greenhouse beranda, tentang kami, galeri | Diberikan pemilik | 472×275, rendah | alt deskriptif |
| PRF-03 | `profil/pokcoy-dipanen-dengan-akar.jpg` | Foto | DOC-01 hlm. 3 | Tangan memegang pokcoy berakar | Panen bersama akar | Proses langkah 3, tentang kami, galeri | Diberikan pemilik | 368×1063, rendah | alt deskriptif |
| PRF-04 | `profil/greenhouse-tanaman-dewasa.jpg` | Foto | DOC-01 hlm. 2 | Meja tanam rimbun | Pembesaran | Proses langkah 2, galeri | Diberikan pemilik | 433×324, rendah | alt deskriptif |
| PRF-05 | `profil/greenhouse-bibit-baru-dipindah.jpg` | Foto | DOC-01 hlm. 4 | Tanaman muda di pipa | Pindah tanam | Proses langkah 1, galeri | Diberikan pemilik | 396×530, rendah | alt deskriptif |

## Foto produk (kemasan)

Sumber: folder "Foto produk". Foto JPG kemasan di atas kain putih dipakai untuk kartu produk. File PNG yang sudah di-remove background oleh pemilik (`pokcoy.png`, `caisim.png`, `selada.png`, `butterhead.png`, `kangkung.png`, `samhong.png`, `romaine.png`) dipangkas dan diperkecil ke `src/assets/images/cutout/` untuk hero beranda (pokcoy, caisim, selada keriting, butterhead, kangkung).

| Asset ID | File/path (web) | Asli | Subject | Intended usage | Permission status | Quality |
|---|---|---|---|---|---|---|
| PRD-01 | `produk/caisim.jpg` | `20221203_110828.jpg` | Caisim dalam kemasan | Katalog, galeri | Diberikan pemilik | 4624×2604 → 901×1600 |
| PRD-02 | `produk/kangkung.jpg` | `20221203_110920.jpg` | Kangkung | sda | sda | sda |
| PRD-03 | `produk/baby-kailan.jpg` | `20221203_110948.jpg` | Baby kailan | sda | sda | sda |
| PRD-04 | `produk/samhong.jpg` | `20221203_111017.jpg` | Samhong | sda | sda | sda |
| PRD-05 | `produk/romaine.jpg` | `20221203_111121.jpg` | Romaine | sda | sda | sda |
| PRD-06 | `produk/pokcoy.jpg` | `20221203_111150.jpg` | Pokcoy | sda | sda | sda |
| PRD-07 | `produk/butterhead.jpg` | `20221203_111218.jpg` | Butterhead | sda | sda | sda |
| PRD-08 | `produk/selada-keriting.jpg` | `20221203_111246.jpg` | Selada keriting | sda | sda | sda |
| PRD-09 | `produk/selada-campur.jpg` | `20221203_112043.jpg` | Selada hijau + merah (tidak ada di katalog 2025) | Proses langkah 4, galeri — **bukan** sebagai produk | sda | sda |
| PRD-10 | `produk/baby-pagoda.jpg` | `20230108_071106.jpg` | Baby pagoda | Katalog, galeri | sda | sda |
| PRD-11 | `produk/bayam-hijau.jpg` | dipotong dari DOC-02 | Bayam hijau tumbuh (bukan kemasan) | Katalog | sda | 280×370, rendah — **belum ada foto kemasan bayam** |

Duplikat yang tidak dipakai (bidikan kedua dari sudut sama): `110849`, `110924`, `110953`, `111027`, `111128`, `111154`, `111222`, `111250`, `112054`.

Pemetaan foto kemasan ke nama produk dicocokkan dengan nama file PNG yang diberikan pemilik. Mohon dikonfirmasi bila ada yang tertukar.

## Aset yang masih dibutuhkan

1. Foto kemasan **bayam hijau**.
2. File asli (resolusi penuh) foto tim/keluarga, LED grow light, dan pokcoy berakar.
3. Logo versi vektor.
4. Foto terbaru (2025–2026) kegiatan panen, pengemasan, dan pengantaran untuk artikel berikutnya.
5. Izin tertulis bila ingin menautkan atau menampilkan postingan Instagram tertentu di artikel.
