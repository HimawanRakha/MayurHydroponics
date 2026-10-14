import Image from "next/image";
import Link from "next/link";

import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink, Container, WhatsAppButton } from "@/components/ui/primitives";
import { LeafMark, PromoTape } from "@/components/ui/promo";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Tentang Kami",
  description:
    "Profil Mayur Hydroponics, kebun sayur hidroponik keluarga di Purwokerto yang berawal saat pandemi. Cara kami menanam di greenhouse tertutup dan kebun kami.",
  path: "/tentang-kami",
  image: {
    url: images.keluarga.src.src,
    width: images.keluarga.src.width,
    height: images.keluarga.src.height,
    alt: images.keluarga.alt,
  },
});

export default function TentangKamiPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ name: "Tentang kami", path: "/tentang-kami" }]}
        title="Kebun sayur keluarga yang tumbuh menjadi usaha"
        tone="dark"
        image={images.greenhouseLuar}
        lead={
          <p>
            Mayur Hydroponics adalah kebun sayur hidroponik di Purwokerto, Kabupaten Banyumas. Kami menanam sayur daun di
            greenhouse tertutup dan mengantarkannya ke rumah-rumah di Purwokerto.
          </p>
        }
      />

      <section aria-labelledby="awal" className="py-8 lg:py-12">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <figure className="-rotate-2 rounded-card bg-surface p-2.5 shadow-float">
              <Image
                src={images.keluarga.src}
                alt={images.keluarga.alt}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full rounded-[1.2rem]"
                style={{ height: "auto" }}
              />
              <figcaption className="px-2 pt-2.5 pb-1 text-sm font-semibold">{images.keluarga.caption}</figcaption>
            </figure>
            <blockquote className="relative mt-5 ml-auto w-[88%] rotate-1 rounded-card bg-highlight p-6 text-on-highlight shadow-float">
              <p className="font-display text-2xl leading-tight font-bold sm:text-3xl">
                “Dedikasi kami, demi sayuran sehat keluarga Anda.”
              </p>
              <footer className="mt-2 text-sm font-semibold">Keluarga besar Mayur Hydroponics</footer>
            </blockquote>
          </div>
          <div className="space-y-5 text-lg lg:col-span-5 lg:col-start-8">
            <h2 id="awal" className="text-[2rem] sm:text-5xl">
              Berawal dari masa pandemi
            </h2>
            <p>
              Pandemi COVID-19 membawa banyak dampak buruk. Bagi kami, ada satu hal baik yang ikut datang: kebiasaan hidup
              sehat. Berawal dari keinginan itu, kami mulai menanam sayur hidroponik untuk konsumsi keluarga sendiri.
              Alasannya sederhana: sayur kaya akan nutrisi, dan sayur yang ditanam sendiri tentu bersih dan bebas dari
              semprotan pestisida.
            </p>
            <p className="text-fg-muted">
              Kami lalu membagikan sayur itu kepada kerabat, dan ternyata semua menyukai rasa dan kebersihannya. Dari
              pengalaman itulah kami ingin menghadirkan sayur sehat dan bermutu untuk keluarga lainnya.
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Cara kami menanam">
        <PromoTape
          tone="leaf"
          tilt="rotate-1"
          items={["Semai di greenhouse", "Tumbuh tanpa pestisida kimia", "LED grow light di malam hari", "Panen bersama akarnya"]}
        />
      </section>

      <section aria-labelledby="cara-menanam" className="py-8 lg:py-12">
        <Container>
          <div className="grid gap-10 rounded-panel bg-mint-100 p-7 sm:p-10 lg:grid-cols-12 lg:p-14">
            <div className="lg:col-span-5">
              <h2 id="cara-menanam" className="text-[2rem] sm:text-5xl">
                Cara kami menanam
              </h2>
              <div className="mt-6 space-y-4 text-lg">
                <p>
                  Semua sayur Mayur ditanam di dalam greenhouse tertutup, mulai dari persemaian hingga pembesaran.
                  Greenhouse yang tertutup mengurangi serangan hama secara signifikan, sehingga kami tidak memerlukan
                  semprotan pestisida kimia.
                </p>
                <p>
                  Untuk memacu pertumbuhan, kami memakai LED grow light agar tanaman tetap tumbuh pada malam hari. Saat
                  panen, sayur dicabut utuh bersama akarnya, sehingga lebih tahan lama saat disimpan.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/publikasi/apa-itu-hidroponik" variant="secondary">
                  Apa itu hidroponik?
                </ButtonLink>
                <ButtonLink href="/publikasi/kenapa-sayur-mayur-ditanam-di-greenhouse-tertutup" variant="secondary">
                  Kenapa greenhouse tertutup?
                </ButtonLink>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:col-start-7">
              {(["bibitKangkung", "pokcoyAkar", "ledGrowLight"] as const).map((key, index) => (
                <figure
                  key={key}
                  className={`relative overflow-hidden rounded-card ${index === 1 ? "row-span-2" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={images[key].src}
                    alt={images[key].alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, 48vw"
                    className={`object-cover ${index === 1 ? "object-bottom" : ""}`}
                  />
                  <figcaption className="sr-only">{images[key].caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="kebun" className="py-8 lg:py-12">
        <Container>
          <div className="relative overflow-hidden rounded-panel bg-inverse-bg p-7 text-inverse-fg sm:p-10 lg:p-14">
            <LeafMark className="pointer-events-none absolute -right-16 -bottom-20 size-96 text-white/[0.05]" />
            <h2 id="kebun" className="text-[2rem] text-highlight sm:text-5xl">
              Kebun Mayur
            </h2>
            <ul className="relative mt-8 grid gap-4 sm:grid-cols-3">
              <li className="rounded-card bg-white/10 p-6">
                <span className="block font-display text-5xl font-extrabold sm:text-6xl">{siteConfig.farmFacts.greenhouses}</span>
                <span className="mt-1 block font-semibold">greenhouse</span>
              </li>
              <li className="rounded-card bg-highlight p-6 text-on-highlight">
                <span className="block font-display text-5xl font-extrabold sm:text-6xl">
                  {siteConfig.farmFacts.plantingHoles.toLocaleString("id-ID")}
                </span>
                <span className="mt-1 block font-semibold">lubang tanam</span>
              </li>
              <li className="rounded-card bg-white/10 p-6">
                <span className="block font-display text-5xl font-extrabold sm:text-6xl">200+</span>
                <span className="mt-1 block font-semibold">kemasan sayur segar per pekan</span>
              </li>
            </ul>
            <p className="relative mt-6 max-w-2xl text-inverse-muted">
              Data per {siteConfig.farmFacts.asOf} dari profil perusahaan tahun 2022. Kebun terus berkembang untuk memenuhi
              kebutuhan sayur segar keluarga Anda.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="selanjutnya" className="py-8 lg:py-12">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-panel bg-highlight p-7 text-on-highlight sm:p-10 md:flex-row md:items-center lg:p-14">
            <div>
              <h2 id="selanjutnya" className="max-w-2xl text-[2rem] sm:text-5xl">
                Coba sayur dari kebun kami
              </h2>
              <p className="mt-3 max-w-xl text-lg font-medium">
                Lihat sayur yang sedang kami tanam beserta harganya, atau{" "}
                <Link href="/kontak" className="font-bold underline">
                  hubungi kami
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/produk">Lihat sayur &amp; harga</ButtonLink>
              <WhatsAppButton variant="secondary" message="Halo Mayur Hydroponics, saya ingin bertanya.">
                Tanya lewat WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
