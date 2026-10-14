/**
 * Single source of truth for business facts shown on the site.
 *
 * Every value here comes from material supplied by the owner:
 * - "Asset Project Website/PROFILE 2022.pdf" (company profile)
 * - "Asset Project Website/katalog mayur 2025 2.jpg" (catalog 2025)
 * - Instagram bio @mayurhydroponics (checked 14 Oct 2026)
 * Confirmed for publication by the owner on 14 Oct 2026 (see docs/project-audit.md).
 * Do not add facts here without a source.
 */

const whatsappNumber = "628156976844";

export const siteConfig = {
  name: "Mayur Hydroponics",
  shortDescription:
    "Kebun sayur hidroponik keluarga di Purwokerto. Sayur ditanam di greenhouse tertutup, dipanen bersama akarnya, dan diantar ke rumah.",
  /**
   * Production URL. Set NEXT_PUBLIC_SITE_URL in the hosting environment once the
   * domain is decided; canonical URLs, sitemap and Open Graph all derive from it.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "id_ID",
  logo: "/logo/mayur-hydroponics-logo.png",

  whatsapp: {
    display: "0815-6976-844",
    number: whatsappNumber,
    href: (message?: string) =>
      `https://wa.me/${whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`,
  },
  instagram: {
    handle: "@mayurhydroponics",
    url: "https://www.instagram.com/mayurhydroponics/",
  },
  address: {
    label: "Kantor pemasaran",
    street: "Perumahan Puri Hijau Pumas 17 No. 1",
    village: "Kel. Karangklesem",
    district: "Kec. Purwokerto Selatan",
    regency: "Kab. Banyumas",
    province: "Jawa Tengah",
    postalCode: "53144",
    locality: "Purwokerto",
  },
  serviceArea: "Purwokerto",

  /** Promotions. Always render with `termsNote`. */
  promos: {
    freeDelivery: {
      minPacks: 4,
      text: "Gratis ongkir untuk area Purwokerto dengan pembelian minimal 4 bungkus.",
    },
    reseller: {
      minPacks: 10,
      text: "Pembelian minimal 10 bungkus mendapat harga khusus mitra reseller.",
    },
    consignment: {
      text: "Untuk toko yang ingin melengkapi etalase dengan sayur Mayur. Skema pasokan dan pembayaran dibicarakan langsung.",
    },
  },
  termsNote: "Syarat dan ketentuan berlaku. Ketentuan promo, harga, dan ukuran dapat berubah sewaktu-waktu.",

  /** Dated facts from the 2022 company profile. Always show with their date. */
  farmFacts: {
    asOf: "Mei 2021",
    greenhouses: 2,
    plantingHoles: 3200,
    weeklyPacks: "lebih dari 200",
  },

  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
} as const;

export const fullAddress = [
  siteConfig.address.street,
  siteConfig.address.village,
  siteConfig.address.district,
  siteConfig.address.regency,
  `${siteConfig.address.province} ${siteConfig.address.postalCode}`,
].join(", ");

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.address.street}, Karangklesem, Purwokerto Selatan, Banyumas`,
)}`;

export const navigation = [
  { href: "/tentang-kami", label: "Tentang kami" },
  { href: "/produk", label: "Sayur & harga" },
  { href: "/publikasi", label: "Publikasi" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
] as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
