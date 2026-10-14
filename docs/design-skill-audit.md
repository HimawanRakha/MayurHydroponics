# Audit delapan design skills

Tanggal audit: 14 Oktober 2026. Lokasi skill: `.claude/skills/` (dipasang dari `nextlevelbuilder/ui-ux-pro-max-skill` v2.15.0 dan `anthropics/skills`).

Kedelapan skill ditemukan dan `SKILL.md`-nya dibaca lengkap. Referensi yang diwajibkan atau relevan juga dibaca (lihat kolom *Key rules*). Tidak ada skill yang gagal diakses.

## Matriks penerapan

| Skill name | Design specialty | Key rules | Implementation | Validation |
|---|---|---|---|---|
| `frontend-design` | Arah visual yang khas dan tidak terasa template; tipografi; copy | Desain berangkat dari subjek; satu elemen berani; maks. 1–2 typeface; hindari aksen satu kata di headline, label ALL CAPS, eyebrow, penomoran palsu, meta "A · B", panah "→"; hindari 5 pola AI (krem + terakota, hitam + hijau asam, broadsheet, SaaS-card kit seragam, template chrome); rencana → review → build → kritik; copy dari sudut pandang pengguna | Elemen promo diturunkan dari subjek: **pita promo** meniru pita hijau di kemasan Mayur, **stiker bulat** berhuruf kecil seperti wordmark, **label harga** seperti di rak sayur. Penomoran hanya di urutan proses yang memang berurutan. CTA berupa kata kerja | Screenshot desktop & mobile tiap halaman; grep tidak ada `uppercase`, `→`, `·` di `src/` |
| `ui-ux-pro-max` | Basis data UI/UX: style, palet, font, UX guideline, stack | Prioritas: aksesibilitas (kontras 4.5:1, alt, keyboard) → sentuhan (44×44) → performa → style → responsif → tipografi/warna → animasi (reduced motion) → form → navigasi | `--design-system` ("local farm fresh vegetables") dan `--stack nextjs`. Pada revisi 2, rekomendasi "Organic Biophilic" (sudut besar membulat, bentuk organik) kini dipakai sesuai permintaan pemilik. Tombol min. 44–48px, stepper `size-11`, fokus terlihat, `prefers-reduced-motion` menghentikan pita & stiker berputar, ikon SVG | Kontras dihitung (tabel di bawah); `next/image` di semua foto; crawl QA; uji overflow 375px di 8 halaman = 0 |
| `design` | Router: brand, token, UI, logo, CIP, banner, ikon, slides | Rute ke sub-skill; pakai aset & logo yang ada; jangan mengarang aturan merek | Identitas → `brand`, token → `design-system`, implementasi → `ui-styling`, promo & OG → `banner-design`. Generator logo/ikon AI tidak dipakai karena logo asli tersedia; ikon garis sederhana digambar sendiri (`Icon` di `primitives.tsx`) | Tidak ada gambar hasil AI di situs |
| `design-system` | Arsitektur token tiga lapis, state komponen | Primitive → semantic → component; tanpa hex mentah di komponen | `globals.css`: primitive (`--c-leaf-*`, `--c-lime-*`, `--c-teal-*`, `--c-mint-*`), semantic (`--sem-*`) dipetakan lewat `@theme inline`, component (`--cmp-radius-panel`, `--cmp-radius-card`, `--cmp-shadow-float`, `--header-height`) | `validate-tokens.cjs`: tanpa hex di komponen; temuan px hanya atribut `sizes` `next/image` dan `themeColor` (wajib literal) |
| `ui-styling` | Tailwind + shadcn/ui, aksesibilitas, responsif | Mobile-first; ekstrak komponen hanya untuk pengulangan nyata; HTML semantik | Tailwind v4. Komponen bersama: `ButtonLink`, `WhatsAppButton`, `Chip`, `PageIntro`, `ArticleCard`, `PartnerCards`, `PromoTape`, `PromoSticker`, `PriceTag`, `FreeDeliveryCard`. shadcn/ui tidak dipasang: interaksi cukup dengan elemen native (`details`, `output`, `aria-pressed`, `aria-expanded`, `role="progressbar"`) | Menu mobile, stepper, filter, FAQ diuji; lint & typecheck bersih |
| `brand` | Identitas, suara merek, konsistensi, aturan logo | Warna dari aset merek; logo tidak diubah; logo penuh min. 120px lebar; nama konsisten | Warna dari piksel logo (hijau #1BA851, hijau muda #8CC37A → lime promo #D6F26B, teal cincin air #009890, charcoal #3A4242). Logo asli di header (±122px) dan di **footer** (di atas kartu putih agar tetap terbaca di latar hijau tua). Suara hangat-kekeluargaan dari profil 2022 | Pemeriksaan visual header & footer; `siteConfig.name` satu sumber |
| `banner-design` | Banner, hero, aset sosial | Ukuran tepat; safe zone; satu CTA utama; aset merek saja | Hero kolase dengan satu CTA utama (WhatsApp) + satu sekunder. Pita promo & stiker memakai teks pendek dengan tanda * yang selalu diikuti catatan S&K. OG image 1200×630 dari foto + logo asli | `og:image` ada di semua halaman (crawl QA) |
| `slides` | Presentasi HTML strategis | Struktur naratif, formula copy | Tidak ada deck dalam lingkup proyek. Prinsip urutan masalah → jawaban dipakai di section greenhouse | Dicatat sebagai *tidak berlaku untuk deliverable website* |

## Revisi 2 (14 Oktober 2026): dari editorial datar ke pemasaran yang berani

Masukan pemilik: desain pertama "terlalu flat dan tidak menarik", tidak boleh ada strip garis, harus lebih modern, berani, cerah, tidak kaku, dengan promo yang menonjol tetapi tidak template. Warna hijau disukai dan dipertahankan.

| Aspek | Versi 1 | Versi 2 | Alasan |
|---|---|---|---|
| Struktur | Section penuh-lebar dipisah garis tipis, grid berhairline | Panel membulat besar (`rounded-panel` 2.5rem) bergantian hijau tua, mint, lime, teal, putih; kartu bertumpuk & dimiringkan | Permintaan "tidak kaku", referensi pemilik memakai panel membulat & kolase |
| Garis | Garis kiri pada promo, garis atas di kartu mitra, divider FAQ & daftar | **Tidak ada strip garis.** Pemisahan dengan warna bidang, jarak, dan bayangan | Larangan eksplisit pemilik |
| Hero | Teks + satu foto | Kolase: foto greenhouse, kartu kemasan pokcoy miring dengan label harga, kapsul "dipanen utuh bersama akarnya", stiker berputar "gratis ongkir area purwokerto" | Permainan komponen dengan aset nyata |
| Promo | Kalimat kecil dengan garis kiri | Pita lime berjalan (meniru pita kemasan), stiker bulat, label harga, kartu "Gratis ongkir se-Purwokerto*", angka besar "10 bungkus" untuk reseller, bar progres gratis ongkir di penyusun pesanan | Promo harus eye-catching; bentuknya diambil dari benda nyata Mayur supaya tidak generik |
| Warna | Putih dingin, hijau tua, teal kecil | + lime #D6F26B untuk highlight, mint & teal muda untuk bidang | "Cerah berwarna" tetap dalam keluarga hijau logo |
| Tipografi | Newsreader (serif) + Figtree | **Bricolage Grotesque** 700–800 (judul) + Figtree | Lebih modern & berani; bentuk membulat selaras wordmark |
| Motion | Hanya hover | + pita berjalan & stiker berputar pelan, kartu terangkat saat hover; semuanya berhenti bila `prefers-reduced-motion` | Hidup tanpa animasi scroll per elemen |
| Footer | Teks nama merek | Logo asli di kartu putih + tombol pesan lime | Permintaan pemilik |

Tetap dihindari: gradien dekoratif, glassmorphism, emoji sebagai ikon, statistik tanpa tanggal, testimoni/badge palsu.

## Revisi 3 (14 Oktober 2026): hero teks raksasa, CTA keranjang, best seller, galeri bento, mobile

Masukan pemilik dan penerapannya:

| Permintaan | Implementasi |
|---|---|
| Hero seperti referensi "FRESH ORGANIC" dengan foto yang ada, anti-mainstream | Panel hijau tua dengan foto lorong greenhouse (diredupkan) sebagai latar, kata **"sayur segar"** raksasa huruf kecil (mengikuti wordmark logo) dalam lime, dan kipas 5 kemasan asli hasil remove-bg pemilik di depannya sehingga menutup separuh bawah huruf. Lencana best seller di atas pokcoy, label harga, stiker gratis ongkir. H1 + CTA berada di kartu putih yang menimpa bagian bawah panel |
| Tombol "Susun pesanan" perlu ikon keranjang dan posisi menonjol | Komponen `OrderCta`: pill besar dengan ikon keranjang dalam lingkaran + keterangan "Pilih sayur, kirim daftarnya ke WhatsApp". Dipakai di hero dan di atas daftar sayur. Ditambah `FloatingOrderButton` (ikon keranjang, selalu terlihat di pojok kanan bawah, kecuali di halaman produk) dan ikon keranjang besar di judul "Susun pesanan" |
| Label best seller menarik pada pokcoy & selada keriting | `bestSeller: true` di `products.ts` (keputusan pemilik). `BestSellerBadge`: segel starburst hijau tua bertepi putus-putus lime, sedikit miring. Kartu produk best seller berlatar hijau tua; di penyusun pesanan ditandai bintang + "best seller" |
| Galeri lebih rapi, ukuran bervariasi tapi seimbang dalam satu kotak | Satu panel hijau tua berisi grid bento: 4 kolom x 5 baris di desktop, 2 kolom x 10 baris di HP, semua sel terisi; bentang mengikuti orientasi foto. Caption muncul saat hover/fokus (tanpa pill) |
| Hindari label pill seperti "Dipanen bersama akarnya" | Komponen `Chip` dihapus. Fakta hero, berat produk, kategori artikel, dan caption foto kini teks biasa atau hanya untuk screen reader |
| Responsif: elemen kebesaran, satu gambar satu layar | Judul HP 32–34px (sebelumnya 48px); kartu produk 2 kolom di HP; langkah proses jadi baris (foto 104px + teks); preview galeri 2 foto berdampingan; foto intro halaman maks. 256px di HP; panel & kartu mitra dengan padding lebih kecil. Diuji di 375px: 9 halaman tanpa scroll horizontal |

## Token final (revisi 2)

| Lapisan | Token | Nilai | Fungsi |
|---|---|---|---|
| Primitive | `--c-leaf-900` / `-950` | #143826 / #0D2418 | Panel gelap, footer / teks di atas lime |
| Primitive | `--c-leaf-700` | #1D6A3E | Tombol utama & tautan |
| Primitive | `--c-leaf-500` / `-300` | #1BA851 / #8CC37A | Hijau logo, dekoratif |
| Primitive | `--c-lime-300` / `-100` | #D6F26B / #EFFAD0 | Highlight promo / bidang lembut |
| Primitive | `--c-teal-700` / `-500` / `-100` | #00716B / #009890 / #D3F1EC | Aksen / ring fokus / bidang |
| Primitive | `--c-mint-50` / `-100` / `-200` | #F3FAF2 / #E2F3E3 / #C9E8CD | Latar halaman / panel / bidang foto |
| Primitive | `--c-charcoal-900` / `-500` | #1F2A27 / #4F5D58 | Teks / teks sekunder |
| Component | `--cmp-radius-panel` / `--cmp-radius-card` | 2.5rem / 1.75rem | Panel section / kartu |
| Component | `--cmp-shadow-float` | 0 24px 48px -24px hijau 45% | Elemen yang "mengambang" |
| Type | Bricolage Grotesque 700–800, Figtree 400–700 | 14–88px | Judul berani, teks mudah dibaca |

### Kontras (WCAG 2.1)

| Pasangan | Rasio |
|---|---|
| Teks utama di latar mint | 13.93 |
| Teks sekunder di mint-50 / mint-100 / lime-100 / teal-100 | 6.50 / 5.98 / 6.34 / 5.78 |
| Teks hijau-hitam di lime | 13.08 |
| Lime di panel hijau tua | 10.33 |
| Teks sekunder di panel hijau tua | 8.15 |
| Putih di tombol utama | 6.60 |
| Tautan utama di putih / mint-100 | 6.60 / 5.71 |
| Aksen teal di teal-100 | 4.91 |

Semua teks ≥ 4.5:1 (AA).

## Review pasca-implementasi

- **frontend-design:** satu bahasa promo yang konsisten (pita, stiker, label harga) yang berasal dari kemasan & katalog Mayur, bukan ornamen generik. Tidak ada eyebrow ALL CAPS, aksen satu kata, atau panah teks.
- **ui-ux-pro-max:** target sentuh ≥44px, fokus terlihat, reduced motion, tanpa scroll horizontal di 375px (diuji 8 halaman setelah memperbaiki pita promo, label harga galeri, dan kolom artikel). Carousel produk di ponsel memakai scroll-snap yang disengaja.
- **design-system / ui-styling:** token tiga lapis tanpa referensi melingkar; komponen promo dipakai ulang di beranda, produk, kontak, galeri.
- **brand:** logo asli di header dan footer, tidak diubah warna atau efek.
- **banner-design:** setiap tanda * pada promo diikuti catatan "Syarat dan ketentuan berlaku…" di dekatnya.
