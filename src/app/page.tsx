import Image, { type StaticImageData } from "next/image";

import cutButterhead from "@/assets/images/cutout/butterhead.png";
import cutCaisim from "@/assets/images/cutout/caisim.png";
import cutKangkung from "@/assets/images/cutout/kangkung.png";
import cutPokcoy from "@/assets/images/cutout/pokcoy.png";
import cutSelada from "@/assets/images/cutout/selada-keriting.png";

import { ArticleCard } from "@/components/publication/ArticleCard";
import { PartnerCards } from "@/components/product/PartnerCards";
import { ProductSpecimens } from "@/components/product/ProductSpecimens";
import { ButtonLink, Container, Icon, InstagramIcon, TermsNote, WhatsAppButton } from "@/components/ui/primitives";
import {
  BestSellerBadge,
  FreeDeliveryCard,
  LeafMark,
  OrderCta,
  PriceTag,
  PromoSticker,
  PromoTape,
} from "@/components/ui/promo";
import { images, type ImageKey } from "@/lib/images";
import { catalogLabel, formatRupiah, products } from "@/lib/products";
import { getPublishedArticles } from "@/lib/publications";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, mapsUrl, siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Mayur Hydroponics | Sayur Hidroponik di Purwokerto",
  absoluteTitle: true,
  description:
    "Sayur hidroponik segar dari greenhouse di Purwokerto: caisim, pokcoy, selada, dan lainnya mulai Rp7.000. Pesan lewat WhatsApp, gratis ongkir se-Purwokerto.",
  path: "/",
});

const lowestPrice = formatRupiah(Math.min(...products.map((p) => p.price)));

/**
 * Packs gathered into one bouquet. Positions are percentages of the bouquet box,
 * which is centred in the hero, so the cluster keeps its shape at every width.
 */
const heroPacks: { image: StaticImageData; alt: string; className: string }[] = [
  { image: cutKangkung, alt: "Kemasan kangkung Mayur Hydroponics", className: "left-[5%] h-[90%] -rotate-[17deg] z-[1]" },
  { image: cutCaisim, alt: "Kemasan caisim Mayur Hydroponics", className: "left-[63%] h-[96%] rotate-[15deg] z-[1]" },
  { image: cutSelada, alt: "Kemasan selada keriting Mayur Hydroponics", className: "left-[1%] h-[62%] -rotate-[9deg] z-[2]" },
  { image: cutButterhead, alt: "Kemasan butterhead Mayur Hydroponics", className: "left-[52%] h-[50%] rotate-[9deg] z-[3]" },
  { image: cutPokcoy, alt: "Kemasan pokcoy Mayur Hydroponics", className: "left-[24%] h-[84%] z-[4]" },
];

const tapeItems = [
  `Gratis ongkir se-Purwokerto, min. ${siteConfig.promos.freeDelivery.minPacks} bungkus*`,
  "Dipanen bersama akarnya",
  `Harga mulai ${lowestPrice}`,
  "Ditanam di greenhouse tertutup",
  `Harga mitra mulai ${siteConfig.promos.reseller.minPacks} bungkus*`,
];

const steps: { title: string; body: string; image: ImageKey; focus?: string; tint: string }[] = [
  {
    title: "Semai dan pindah tanam",
    body: "Benih disemai, lalu bibitnya dipindah ke netpot di pipa hidroponik. Semuanya dikerjakan di dalam greenhouse.",
    image: "greenhouseBibit",
    tint: "bg-surface",
  },
  {
    title: "Tumbuh di greenhouse tertutup",
    body: "Akar tanaman mendapat air bernutrisi di lingkungan yang bersih dan tertutup, sehingga serangan hama jauh berkurang.",
    image: "greenhouseDewasa",
    tint: "bg-lime-100",
  },
  {
    title: "Dipanen bersama akarnya",
    body: "Sayur dicabut utuh dengan akarnya, sehingga lebih tahan lama saat disimpan di rumah.",
    image: "pokcoyAkar",
    focus: "object-bottom",
    tint: "bg-teal-100",
  },
  {
    title: "Dikemas dan diantar",
    body: "Setiap ikat dikemas dan diberi label Mayur, lalu diantar ke rumah Anda di Purwokerto.",
    image: "seladaCampur",
    tint: "bg-surface",
  },
];

export default function HomePage() {
  const articles = getPublishedArticles().slice(0, 3);
  const [featured, ...more] = articles;

  return (
    <>
      {/* Hero */}
      <section className="pt-4 pb-6 sm:pt-6 lg:pb-10">
        <Container>
          <div className="@container relative isolate aspect-[5/6] overflow-hidden rounded-panel bg-leaf-950 sm:aspect-[4/3] lg:aspect-[16/9]">
            <Image
              src={images.lorongGreenhouse.src}
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="-z-10 scale-110 object-cover opacity-60 blur-[2px]"
            />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,transparent_20%,rgb(13_36_24/0.6)_78%)]" />

            <p
              aria-hidden="true"
              className="absolute inset-x-0 top-[6%] text-center font-display font-extrabold text-highlight sm:top-[4%]"
            >
              <span className="block text-[10cqw] leading-none tracking-[-0.04em] sm:text-[7cqw]">Sayur Hidroponik</span>
              <span className="block text-[31cqw] leading-[0.82] tracking-[-0.06em] sm:text-[26cqw]">Segar</span>
            </p>

            <div className="absolute bottom-[8%] left-1/2 aspect-[1.15/1] h-[56%] -translate-x-1/2 sm:bottom-[10%] sm:aspect-[1.3/1] sm:h-[58%] lg:bottom-[4%] lg:h-[54%]">
              {heroPacks.map((pack) => (
                <div key={pack.alt} className={`absolute bottom-0 origin-bottom ${pack.className}`}>
                  <Image
                    src={pack.image}
                    alt={pack.alt}
                    loading="eager"
                    sizes="(min-width: 1024px) 20vw, 45vw"
                    className="h-full w-auto drop-shadow-[0_18px_24px_rgb(0_0_0/0.4)]"
                  />
                </div>
              ))}
              <BestSellerBadge size="md" className="absolute top-[6%] left-[20%] z-[5] lg:size-24 lg:text-[0.8rem]" />
              <PriceTag
                price={Math.min(...products.map((p) => p.price))}
                prefix="mulai"
                className="absolute bottom-[16%] left-[62%] z-[5] rotate-6 lg:text-2xl"
              />
            </div>

            <div className="absolute top-6 right-6 z-[6] hidden sm:block">
              <PromoSticker
                ring="gratis ongkir ✿ area purwokerto ✿ gratis ongkir ✿ area purwokerto ✿ "
                className="size-28 lg:size-36"
              >
                <span className="block font-display text-xs font-bold lg:text-base">min. 4 bungkus*</span>
              </PromoSticker>
            </div>
          </div>

          <div className="relative z-10 mx-2 -mt-8 grid gap-6 rounded-panel bg-surface p-6 shadow-float sm:mx-6 sm:-mt-10 sm:p-8 lg:grid-cols-12 lg:items-center lg:p-10">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-accent">Kebun hidroponik keluarga di Purwokerto, Banyumas</p>
              <h1 className="mt-2 text-[1.85rem] sm:text-4xl lg:text-5xl">Sayur hidroponik segar dari greenhouse kami</h1>
              <p className="mt-3 max-w-xl text-fg-muted sm:text-lg">
                Ditanam tanpa semprotan pestisida kimia, dipanen utuh bersama akarnya, dan diantar ke rumah Anda.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-5">
              <OrderCta />
              <WhatsAppButton variant="secondary" message="Halo Mayur Hydroponics, saya mau pesan sayur.">
                Tanya dulu lewat WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Promo tape */}
      <section aria-label="Promo">
        <PromoTape items={tapeItems} />
        <Container>
          <TermsNote className="text-center" />
        </Container>
      </section>

      {/* Brand introduction */}
      <section aria-labelledby="cerita" className="py-8 lg:py-12">
        <Container>
          <div className="relative grid gap-10 overflow-hidden rounded-panel bg-inverse-bg p-7 text-inverse-fg sm:p-10 lg:grid-cols-12 lg:p-14">
            <LeafMark className="pointer-events-none absolute -top-20 -left-20 size-80 text-white/[0.04]" />
            <div className="relative lg:col-span-6">
              <h2 id="cerita" className="text-[2rem] text-highlight sm:text-5xl">
                Berawal dari kebun untuk keluarga sendiri
              </h2>
              <div className="mt-6 space-y-4 text-lg text-inverse-muted">
                <p>
                  Saat pandemi COVID-19, kami mulai menanam sayur hidroponik untuk dimakan sendiri: bersih, kaya nutrisi, dan
                  tanpa semprotan pestisida. Sayur itu lalu kami bagikan ke kerabat, dan ternyata mereka menyukai rasa serta
                  kebersihannya.
                </p>
                <p>
                  Dari situ Mayur Hydroponics lahir. Kami merawat setiap tanaman seperti saat menanam untuk meja makan kami
                  sendiri.
                </p>
              </div>
              <ButtonLink href="/tentang-kami" variant="highlight" className="mt-8">
                Baca cerita lengkap kami
              </ButtonLink>
            </div>
            <div className="relative lg:col-span-6">
              <figure className="rotate-2 rounded-card bg-surface p-2.5 text-fg shadow-float">
                <Image
                  src={images.keluarga.src}
                  alt={images.keluarga.alt}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-auto w-full rounded-[1.2rem]"
                  style={{ height: "auto" }}
                />
                <figcaption className="px-2 pt-2.5 pb-1 text-sm font-semibold">{images.keluarga.caption}</figcaption>
              </figure>
              <blockquote className="relative mt-5 ml-auto w-[88%] -rotate-1 rounded-card bg-highlight p-5 text-on-highlight shadow-float">
                <p className="font-display text-2xl leading-tight font-bold">
                  “Dedikasi kami, demi sayuran sehat keluarga Anda.”
                </p>
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* Product showcase */}
      <section aria-labelledby="sayur" className="py-8 lg:py-12">
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 id="sayur" className="text-[2rem] sm:text-5xl">
                Pilih sayur favorit keluarga
              </h2>
              <p className="mt-3 text-lg text-fg-muted">
                Harga per bungkus sesuai {catalogLabel}. Semua sayur dikemas bersama akarnya.
              </p>
            </div>
            <OrderCta tone="dark" className="self-start md:self-auto" />
          </div>
          <div className="mt-10">
            <ProductSpecimens />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FreeDeliveryCard />
            <div className="flex items-center gap-4 rounded-card bg-teal-100 p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface text-accent">
                <Icon name="sun" className="size-6" />
              </span>
              <p className="font-semibold">
                Ketersediaan tiap sayur mengikuti panen. Kami konfirmasi stok dan jadwal antar saat Anda memesan.
              </p>
            </div>
          </div>
          <TermsNote className="mt-4" />
        </Container>
      </section>

      {/* Growing process */}
      <section aria-labelledby="proses" className="py-8 lg:py-12">
        <Container>
          <div className="rounded-panel bg-mint-100 p-7 pb-10 sm:p-10 lg:p-14 lg:pb-24">
            <h2 id="proses" className="max-w-2xl text-[2rem] sm:text-5xl">
              Dari semai sampai depan pintu
            </h2>
            <ol className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {steps.map((step, index) => {
                const image = images[step.image];
                return (
                  <li
                    key={step.title}
                    className={`grid grid-cols-[6.5rem_1fr] gap-3 rounded-card p-2.5 sm:block ${step.tint} ${
                      index % 2 === 1 ? "lg:translate-y-10" : ""
                    }`}
                  >
                    <div className="relative h-full min-h-32 overflow-hidden rounded-[1.1rem] bg-mint-200 sm:aspect-[4/5] sm:h-auto sm:min-h-0 sm:rounded-[1.35rem]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 90vw"
                        className={`object-cover ${step.focus ?? ""}`}
                      />
                      <span className="absolute top-2 left-2 grid size-9 place-items-center rounded-full bg-primary font-display text-lg font-extrabold text-on-primary sm:top-3 sm:left-3 sm:size-12 sm:text-2xl">
                        {index + 1}
                      </span>
                    </div>
                    <div className="py-1 pr-2 sm:px-2 sm:pt-4 sm:pb-3">
                      <h3 className="text-lg sm:text-2xl">{step.title}</h3>
                      <p className="mt-1 text-sm text-fg-muted sm:mt-2 sm:text-base">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      {/* Greenhouse facts */}
      <section aria-labelledby="greenhouse" className="py-8 lg:py-12">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel shadow-float">
              <Image
                src={images.ledGrowLight.src}
                alt={images.ledGrowLight.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <ul className="absolute -bottom-8 left-4 flex flex-wrap gap-2 sm:left-6">
              <li className="rounded-card bg-surface px-4 py-3 shadow-float">
                <span className="block font-display text-3xl font-extrabold text-primary">
                  {siteConfig.farmFacts.greenhouses}
                </span>
                <span className="text-sm font-semibold">greenhouse</span>
              </li>
              <li className="rounded-card bg-highlight px-4 py-3 text-on-highlight shadow-float">
                <span className="block font-display text-3xl font-extrabold">
                  {siteConfig.farmFacts.plantingHoles.toLocaleString("id-ID")}
                </span>
                <span className="text-sm font-semibold">lubang tanam</span>
              </li>
              <li className="hidden rounded-card bg-surface px-4 py-3 shadow-float sm:block">
                <span className="block font-display text-3xl font-extrabold text-primary">200+</span>
                <span className="text-sm font-semibold">kemasan per pekan</span>
              </li>
            </ul>
          </div>
          <div className="pt-8 lg:col-span-5 lg:col-start-8 lg:pt-0">
            <h2 id="greenhouse" className="text-[2rem] sm:text-5xl">
              Kenapa kami menanam di greenhouse tertutup
            </h2>
            <div className="mt-6 space-y-4 text-lg">
              <p>
                Daun berlubang sering dianggap tanda sayur bebas pestisida. Di kebun terbuka itu mungkin benar. Kami memilih
                cara lain: greenhouse tertutup mengurangi serangan hama secara signifikan, sehingga kami tidak memerlukan
                pestisida kimia untuk mendapatkan sayur yang mulus.
              </p>
              <p className="text-fg-muted">
                Pada malam hari, LED grow light membantu tanaman tetap tumbuh. Angka kapasitas di foto adalah data per{" "}
                {siteConfig.farmFacts.asOf}.
              </p>
            </div>
            <ButtonLink href="/publikasi/kenapa-sayur-mayur-ditanam-di-greenhouse-tertutup" variant="secondary" className="mt-8">
              Baca selengkapnya
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Partnership */}
      <section aria-labelledby="kemitraan" className="py-8 lg:py-12">
        <Container>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 id="kemitraan" className="max-w-xl text-[2rem] sm:text-5xl">
              Jual lagi sayur Mayur di toko Anda
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

      {/* Featured publications */}
      {featured && (
        <section aria-labelledby="publikasi" className="py-8 lg:py-12">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <h2 id="publikasi" className="text-[2rem] sm:text-5xl">
                Catatan dari kebun
              </h2>
              <ButtonLink href="/publikasi" variant="secondary" className="shrink-0 self-start sm:self-auto">
                Semua publikasi
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <ArticleCard article={featured} size="large" />
              </div>
              {more.length > 0 && (
                <div className="flex flex-col gap-5 lg:col-span-5">
                  {more.map((article) => (
                    <ArticleCard key={article.slug} article={article} size="compact" />
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Gallery preview */}
      <section aria-labelledby="galeri" className="py-8 lg:py-12">
        <Container className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-12">
          <div className="col-span-2 flex flex-col justify-between rounded-panel bg-primary p-7 text-on-primary sm:p-10 md:col-span-4">
            <div>
              <h2 id="galeri" className="text-3xl sm:text-4xl">
                Intip isi kebun kami
              </h2>
              <p className="mt-3 text-inverse-muted">Foto dari greenhouse dan hasil panen Mayur Hydroponics.</p>
            </div>
            <ButtonLink href="/galeri" variant="highlight" className="mt-8 self-start">
              Buka galeri foto
            </ButtonLink>
          </div>
          <figure className="relative aspect-[3/4] overflow-hidden rounded-card md:col-span-4 md:aspect-auto md:rounded-panel">
            <Image
              src={images.butterheadGreenhouse.src}
              alt={images.butterheadGreenhouse.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
            <figcaption className="sr-only">{images.butterheadGreenhouse.caption}</figcaption>
          </figure>
          <figure className="relative grid place-items-center md:col-span-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-float">
              <Image
                src={images.barisanSelada.src}
                alt={images.barisanSelada.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="sr-only">{images.barisanSelada.caption}</figcaption>
          </figure>
        </Container>
      </section>

      {/* Order + location */}
      <section aria-labelledby="lokasi" className="py-8 lg:py-12">
        <Container>
          <div className="relative grid gap-10 overflow-hidden rounded-panel bg-highlight p-7 text-on-highlight sm:p-10 lg:grid-cols-12 lg:p-14">
            <LeafMark className="pointer-events-none absolute -top-24 -right-24 size-96 text-leaf-950/[0.07]" />
            <div className="relative lg:col-span-7">
              <h2 id="lokasi" className="text-[2.1rem] sm:text-6xl">
                Pesan sayur untuk minggu ini
              </h2>
              <p className="mt-5 max-w-xl text-lg font-medium">
                Kirim daftar sayur lewat WhatsApp. Kami pastikan ketersediaan dan jadwal antarnya. Belanja{" "}
                {siteConfig.promos.freeDelivery.minPacks} bungkus atau lebih, ongkir gratis se-Purwokerto.*
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <WhatsAppButton message="Halo Mayur Hydroponics, saya mau pesan sayur." />
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white/60 px-5 font-bold transition-colors hover:bg-white"
                >
                  <InstagramIcon className="size-5" />
                  {siteConfig.instagram.handle}
                </a>
              </div>
              <p className="mt-6 text-sm font-medium">* {siteConfig.termsNote}</p>
            </div>
            <div className="relative rounded-card bg-surface p-6 text-fg shadow-float lg:col-span-5 lg:self-center">
              <span className="grid size-12 place-items-center rounded-full bg-mint-100 text-primary">
                <Icon name="pin" className="size-6" />
              </span>
              <h3 className="mt-4 text-2xl">{siteConfig.address.label}</h3>
              <address className="mt-2 not-italic">{fullAddress}</address>
              <p className="mt-3 text-fg-muted">
                Ingin mengambil sendiri? Kabari kami lewat WhatsApp terlebih dahulu agar sayur bisa disiapkan.
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center font-bold text-primary underline hover:text-primary-hover"
              >
                Buka lokasi di Google Maps
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
