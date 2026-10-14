import type { StaticImageData } from "next/image";

import lorongGreenhouse from "@/assets/images/kebun/lorong-greenhouse-mayur-hydroponics.jpg";
import greenhouseLuar from "@/assets/images/kebun/greenhouse-mayur-tampak-luar.jpg";
import butterheadGreenhouse from "@/assets/images/kebun/selada-butterhead-dan-selada-merah-di-greenhouse.jpg";
import barisanSelada from "@/assets/images/kebun/barisan-selada-hijau-dan-merah.jpg";
import bibitKangkung from "@/assets/images/kebun/bibit-kangkung-di-netpot.jpg";
import pokcoyKeranjang from "@/assets/images/kebun/pokcoy-panen-dalam-keranjang.jpg";
import keluarga from "@/assets/images/profil/keluarga-mayur-hydroponics.jpg";
import ledGrowLight from "@/assets/images/profil/led-grow-light-malam-hari.jpg";
import pokcoyAkar from "@/assets/images/profil/pokcoy-dipanen-dengan-akar.jpg";
import greenhouseDewasa from "@/assets/images/profil/greenhouse-tanaman-dewasa.jpg";
import greenhouseBibit from "@/assets/images/profil/greenhouse-bibit-baru-dipindah.jpg";
import seladaCampur from "@/assets/images/produk/selada-campur.jpg";

export type SiteImage = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

/**
 * Every photo used on the site, with alt text describing what is visible.
 * Sources and permissions are listed in docs/asset-inventory.md.
 */
export const images = {
  lorongGreenhouse: {
    src: lorongGreenhouse,
    alt: "Lorong di dalam greenhouse Mayur Hydroponics dengan deretan pipa hidroponik penuh pokcoy di kiri dan kanan",
    caption: "Lorong greenhouse, deretan pokcoy menjelang panen.",
  },
  greenhouseLuar: {
    src: greenhouseLuar,
    alt: "Bangunan greenhouse Mayur Hydroponics berdinding plastik bening dilihat dari luar pada siang hari",
    caption: "Greenhouse tertutup tempat semua sayur Mayur ditanam.",
  },
  butterheadGreenhouse: {
    src: butterheadGreenhouse,
    alt: "Selada butterhead hijau di depan barisan selada merah di dalam greenhouse",
    caption: "Butterhead dan selada merah di meja tanam.",
  },
  barisanSelada: {
    src: barisanSelada,
    alt: "Tiga barisan selada dilihat dari atas: hijau muda, merah keunguan, dan hijau keriting",
    caption: "Selada hijau, merah, dan keriting dalam satu meja tanam.",
  },
  bibitKangkung: {
    src: bibitKangkung,
    alt: "Bibit kangkung muda di netpot hitam yang berjajar rapi di atas pipa hidroponik putih",
    caption: "Bibit kangkung setelah dipindah ke netpot.",
  },
  pokcoyKeranjang: {
    src: pokcoyKeranjang,
    alt: "Pokcoy hasil panen bertumpuk di keranjang plastik hijau",
    caption: "Pokcoy hasil panen sebelum dikemas.",
  },
  keluarga: {
    src: keluarga,
    alt: "Empat anggota keluarga Mayur Hydroponics berdiri di depan spanduk Mayur dan barisan tanaman di greenhouse",
    caption: "Keluarga besar Mayur Hydroponics.",
  },
  ledGrowLight: {
    src: ledGrowLight,
    alt: "Meja tanam hidroponik pada malam hari diterangi lampu LED grow light berwarna ungu",
    caption: "LED grow light menyala pada malam hari.",
  },
  pokcoyAkar: {
    src: pokcoyAkar,
    alt: "Tangan memegang satu pokcoy yang baru dicabut dari pipa hidroponik, akarnya masih utuh",
    caption: "Pokcoy dipanen utuh bersama akarnya.",
  },
  greenhouseDewasa: {
    src: greenhouseDewasa,
    alt: "Meja tanam berisi tanaman dewasa yang rimbun di bawah atap greenhouse",
    caption: "Tanaman dewasa di greenhouse.",
  },
  greenhouseBibit: {
    src: greenhouseBibit,
    alt: "Barisan pipa hidroponik putih dengan tanaman muda yang baru dipindah tanam di dalam greenhouse",
    caption: "Tanaman muda yang baru dipindah tanam.",
  },
  seladaCampur: {
    src: seladaCampur,
    alt: "Kemasan plastik Mayur Hydroponics berisi selada hijau dan selada merah lengkap dengan akarnya",
    caption: "Selada hijau dan merah dalam satu kemasan.",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

export function isImageKey(value: string): value is ImageKey {
  return value in images;
}
