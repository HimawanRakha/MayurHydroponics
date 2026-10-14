import type { StaticImageData } from "next/image";

import caisim from "@/assets/images/produk/caisim.jpg";
import pokcoy from "@/assets/images/produk/pokcoy.jpg";
import kangkung from "@/assets/images/produk/kangkung.jpg";
import bayamHijau from "@/assets/images/produk/bayam-hijau.jpg";
import samhong from "@/assets/images/produk/samhong.jpg";
import babyKailan from "@/assets/images/produk/baby-kailan.jpg";
import babyPagoda from "@/assets/images/produk/baby-pagoda.jpg";
import romaine from "@/assets/images/produk/romaine.jpg";
import butterhead from "@/assets/images/produk/butterhead.jpg";
import seladaKeriting from "@/assets/images/produk/selada-keriting.jpg";

export type Product = {
  id: string;
  name: string;
  botanicalName: string;
  /** Minimum net weight per pack, in grams ("200 gr up" in the catalog). */
  minWeight: number;
  /** Price per pack in rupiah, from catalog 2025. */
  price: number;
  use: string;
  image: StaticImageData;
  imageAlt: string;
  /** Packaged shot vs. growing-plant shot (only bayam has no packaged photo yet). */
  imageKind: "kemasan" | "tanaman";
  /** Marked as best seller by the owner (14 Oct 2026). */
  bestSeller?: boolean;
};

/** Source: "katalog mayur 2025" (prices and weights). Order follows the catalog. */
export const catalogLabel = "Katalog 2025";

export const products: Product[] = [
  {
    id: "caisim",
    name: "Caisim",
    botanicalName: "Brassica rapa var. parachinensis",
    minWeight: 200,
    price: 7000,
    use: "Batang renyah, biasa ditumis atau jadi pelengkap mi.",
    image: caisim,
    imageAlt: "Caisim dalam kemasan plastik berlabel Mayur Hydroponics, akar terbungkus di bagian bawah",
    imageKind: "kemasan",
  },
  {
    id: "pokcoy",
    name: "Pokcoy",
    botanicalName: "Brassica rapa subsp. chinensis",
    minWeight: 200,
    price: 8000,
    use: "Pangkal tebal dan daun lembut untuk tumis, sup, atau kukus.",
    image: pokcoy,
    imageAlt: "Pokcoy dalam kemasan plastik berlabel Mayur Hydroponics dengan akar di bagian bawah",
    imageKind: "kemasan",
    bestSeller: true,
  },
  {
    id: "kangkung",
    name: "Kangkung",
    botanicalName: "Ipomoea aquatica",
    minWeight: 200,
    price: 7000,
    use: "Untuk tumis kangkung, plecing, atau pecel.",
    image: kangkung,
    imageAlt: "Seikat kangkung dalam kemasan plastik berlabel Mayur Hydroponics dengan akar di bagian bawah",
    imageKind: "kemasan",
  },
  {
    id: "bayam-hijau",
    name: "Bayam hijau",
    botanicalName: "Amaranthus sp.",
    minWeight: 200,
    price: 8000,
    use: "Untuk sayur bening atau tumis.",
    image: bayamHijau,
    imageAlt: "Daun bayam hijau yang tumbuh rapat di meja tanam greenhouse",
    imageKind: "tanaman",
  },
  {
    id: "samhong",
    name: "Samhong",
    botanicalName: "Brassica juncea",
    minWeight: 200,
    price: 8000,
    use: "Sawi dengan rasa sedikit pedas, cocok untuk tumis dan sup.",
    image: samhong,
    imageAlt: "Samhong berbatang putih dalam kemasan plastik berlabel Mayur Hydroponics",
    imageKind: "kemasan",
  },
  {
    id: "baby-kailan",
    name: "Baby kailan",
    botanicalName: "Brassica oleracea var. alboglabra",
    minWeight: 150,
    price: 8000,
    use: "Daun tebal, enak ditumis dengan bawang putih.",
    image: babyKailan,
    imageAlt: "Baby kailan dalam kemasan plastik berlabel Mayur Hydroponics dengan akar di bagian bawah",
    imageKind: "kemasan",
  },
  {
    id: "baby-pagoda",
    name: "Baby pagoda",
    botanicalName: "Brassica rapa subsp. narinosa",
    minWeight: 200,
    price: 8000,
    use: "Daun hijau tua mengilap untuk tumis dan sup.",
    image: babyPagoda,
    imageAlt: "Baby pagoda berdaun hijau tua dalam kemasan plastik berlabel Mayur Hydroponics",
    imageKind: "kemasan",
  },
  {
    id: "romaine",
    name: "Romaine",
    botanicalName: "Lactuca sativa var. longifolia",
    minWeight: 150,
    price: 10000,
    use: "Selada berdaun panjang untuk salad dan isian roti.",
    image: romaine,
    imageAlt: "Selada romaine dalam kemasan plastik berlabel Mayur Hydroponics dengan akar di bagian bawah",
    imageKind: "kemasan",
  },
  {
    id: "butterhead",
    name: "Butterhead",
    botanicalName: "Lactuca sativa var. capitata",
    minWeight: 150,
    price: 10000,
    use: "Daun lembut untuk salad dan lalapan.",
    image: butterhead,
    imageAlt: "Dua bonggol selada butterhead dalam kemasan plastik berlabel Mayur Hydroponics, akar terlihat",
    imageKind: "kemasan",
  },
  {
    id: "selada-keriting",
    name: "Selada keriting",
    botanicalName: "Lactuca sativa var. crispa",
    minWeight: 150,
    price: 10000,
    use: "Untuk salad, burger, dan lalapan.",
    image: seladaKeriting,
    imageAlt: "Selada keriting hijau dalam kemasan plastik berlabel Mayur Hydroponics dengan akar di bagian bawah",
    imageKind: "kemasan",
    bestSeller: true,
  },
];

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatRupiah(value: number) {
  return rupiah.format(value).replace(/\s/g, "");
}

export const priceRange = `${formatRupiah(Math.min(...products.map((p) => p.price)))}–${formatRupiah(
  Math.max(...products.map((p) => p.price)),
)}`;
