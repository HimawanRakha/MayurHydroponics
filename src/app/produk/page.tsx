import Link from "next/link";

import { PageIntro } from "@/components/layout/PageIntro";
import { OrderBuilder } from "@/components/product/OrderBuilder";
import { PartnerCards } from "@/components/product/PartnerCards";
import { ProductSpecimens } from "@/components/product/ProductSpecimens";
import { PromoSticker } from "@/components/ui/promo";
import { Container, Icon, TermsNote, WhatsAppButton } from "@/components/ui/primitives";
import { catalogLabel, products } from "@/lib/products";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Sayur Hidroponik & Harga",
  description:
    "Harga sayur hidroponik Mayur Hydroponics Purwokerto: caisim, pokcoy, kangkung, bayam, selada. Susun pesanan, kirim lewat WhatsApp, dan info reseller.",
  path: "/produk",
});

const faqs = [
  {
    q: "Bagaimana cara memesan?",
    a: "Pilih sayur di bagian Susun pesanan, lalu kirim pesanannya lewat WhatsApp. Anda juga bisa langsung mengirim daftar sayur ke WhatsApp kami. Tim Mayur akan mengonfirmasi ketersediaan, total harga, dan jadwal pengantaran.",
  },
  {
    q: "Apakah ada biaya ongkir?",
    a: `Untuk area Purwokerto, pembelian minimal ${siteConfig.promos.freeDelivery.minPacks} bungkus mendapat gratis ongkir. Untuk pesanan di bawah itu atau di luar Purwokerto, tanyakan langsung lewat WhatsApp.`,
  },
  {
    q: "Apakah harga di website selalu sama dengan harga saat memesan?",
    a: `Harga di halaman ini mengikuti ${catalogLabel}. Produk, harga, dan ukuran dapat berubah sewaktu-waktu, jadi harga final selalu dikonfirmasi saat Anda memesan.`,
  },
  {
    q: "Kenapa sayurnya dikemas bersama akar?",
    a: "Sayur yang dipanen utuh dengan akarnya lebih tahan lama saat disimpan.",
  },
  {
    q: "Bisakah saya mengambil sendiri?",
    a: "Bisa. Kabari kami lewat WhatsApp terlebih dahulu agar sayur bisa disiapkan di kantor pemasaran kami di Perumahan Puri Hijau, Karangklesem, Purwokerto Selatan.",
  },
];

export default function ProdukPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ name: "Sayur & harga", path: "/produk" }]}
        tone="dark"
        image={images.pokcoyKeranjang}
        title="Sayur hidroponik Mayur dan harganya"
        lead={
          <p>
            Sepuluh sayur daun yang kami tanam di greenhouse tertutup di Purwokerto. Semua dikemas bersama akarnya. Harga
            per bungkus sesuai {catalogLabel}.
          </p>
        }
      />

      <section aria-labelledby="daftar-sayur" className="pb-8 lg:pb-12">
        <Container>
          <h2 id="daftar-sayur" className="sr-only">
            Daftar sayur
          </h2>
          <ProductSpecimens headingLevel="h3" />
          <TermsNote className="mt-4" />
        </Container>
      </section>

      <section id="pesan" aria-labelledby="susun-pesanan" className="py-8 lg:py-12">
        <Container>
          <div className="rounded-panel bg-mint-100 p-5 sm:p-10 lg:p-14">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 id="susun-pesanan" className="flex items-center gap-3 text-[2rem] sm:gap-4 sm:text-5xl">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-highlight text-on-highlight shadow-float sm:size-16">
                    <Icon name="cart" className="size-6 sm:size-8" />
                  </span>
                  Susun pesanan
                </h2>
                <p className="mt-3 max-w-2xl text-fg-muted sm:text-lg">
                  Tentukan jumlah tiap sayur, lalu kirim daftarnya ke WhatsApp kami. Tidak ada data yang disimpan di website
                  ini.
                </p>
              </div>
              <PromoSticker ring="gratis ongkir ✿ area purwokerto ✿ gratis ongkir ✿ area purwokerto ✿ " className="hidden size-36 md:grid">
                <span className="block font-display font-bold">min. 4 bungkus*</span>
              </PromoSticker>
            </div>
            <div className="mt-10">
              <OrderBuilder
                items={products.map(({ id, name, price, minWeight, bestSeller }) => ({ id, name, price, minWeight, bestSeller }))}
                whatsappNumber={siteConfig.whatsapp.number}
                freeDeliveryMinPacks={siteConfig.promos.freeDelivery.minPacks}
              />
            </div>
            <TermsNote className="mt-6" />
          </div>
        </Container>
      </section>

      <section id="kemitraan" aria-labelledby="judul-kemitraan" className="py-8 lg:py-12">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 id="judul-kemitraan" className="max-w-xl text-[2rem] sm:text-5xl">
              Kemitraan untuk reseller dan toko
            </h2>
            <WhatsAppButton
              variant="secondary"
              message="Halo Mayur Hydroponics, saya ingin tahu tentang kemitraan reseller/konsinyasi."
              className="self-start md:self-auto"
            >
              Tanya soal kemitraan
            </WhatsAppButton>
          </div>
          <div className="mt-10">
            <PartnerCards />
          </div>
          <TermsNote className="mt-4" />
        </Container>
      </section>

      <section aria-labelledby="tanya-jawab" className="py-8 lg:py-12">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="tanya-jawab" className="text-[2rem] sm:text-5xl">
              Pertanyaan seputar pemesanan
            </h2>
            <p className="mt-4 text-fg-muted">
              Ingin tahu lebih banyak? Baca{" "}
              <Link href="/publikasi/katalog-sayur-hidroponik-mayur-2025" className="font-semibold text-primary underline">
                daftar sayur di katalog Mayur 2025
              </Link>
              .
            </p>
          </div>
          <div className="space-y-3 lg:col-span-8">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-card bg-surface px-6 py-2 open:bg-lime-100">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-xl text-on-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-4 text-fg-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
