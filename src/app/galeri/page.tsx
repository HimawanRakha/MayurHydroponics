import Image from "next/image";

import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink, Container, InstagramIcon } from "@/components/ui/primitives";
import { BestSellerBadge, PriceTag } from "@/components/ui/promo";
import { images, type ImageKey } from "@/lib/images";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Galeri Kebun",
  description: "Foto greenhouse, tanaman, proses panen, dan kemasan sayur Mayur Hydroponics di Purwokerto.",
  path: "/galeri",
});

/**
 * One balanced bento: 2 columns x 10 rows on phones, 4 columns x 5 rows on
 * desktop. Every cell is filled; spans follow each photo's orientation.
 */
const tiles: { key: ImageKey; className: string; focus?: string }[] = [
  { key: "lorongGreenhouse", className: "col-span-2 row-span-2 lg:col-start-1 lg:row-start-1" },
  { key: "pokcoyAkar", className: "row-span-2 lg:col-start-3 lg:row-start-1", focus: "object-bottom" },
  { key: "pokcoyKeranjang", className: "row-span-2 lg:col-start-4 lg:row-start-1" },
  { key: "greenhouseLuar", className: "col-span-2 lg:col-start-1 lg:row-start-3" },
  { key: "barisanSelada", className: "lg:col-start-3 lg:row-start-3" },
  { key: "bibitKangkung", className: "lg:col-start-4 lg:row-start-3" },
  { key: "butterheadGreenhouse", className: "row-span-2 lg:col-start-1 lg:row-start-4" },
  { key: "seladaCampur", className: "row-span-2 lg:col-start-4 lg:row-start-4" },
  { key: "ledGrowLight", className: "col-span-2 lg:col-start-2 lg:row-start-4" },
  { key: "greenhouseBibit", className: "lg:col-start-2 lg:row-start-5" },
  { key: "greenhouseDewasa", className: "lg:col-start-3 lg:row-start-5" },
];

export default function GaleriPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ name: "Galeri", path: "/galeri" }]}
        tone="lime"
        title="Galeri kebun Mayur"
        lead={<p>Foto dari greenhouse kami di Purwokerto: tempat sayur tumbuh, saat panen, sampai dikemas.</p>}
      />

      <section aria-label="Foto kebun" className="pb-8 lg:pb-12">
        <Container>
          <div className="rounded-panel bg-inverse-bg p-2.5 sm:p-4">
            <ul className="grid auto-rows-[9rem] grid-cols-2 gap-2.5 sm:auto-rows-[13rem] sm:gap-3 lg:auto-rows-[12.5rem] lg:grid-cols-4">
              {tiles.map((tile) => {
                const image = images[tile.key];
                return (
                  <li key={tile.key} className={tile.className}>
                    <figure className="group relative size-full overflow-hidden rounded-[1.25rem] bg-leaf-800">
                      <a href={image.src.src} target="_blank" rel="noopener" className="block size-full">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${tile.focus ?? ""}`}
                        />
                        <span className="sr-only">(buka foto ukuran penuh)</span>
                      </a>
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-[linear-gradient(transparent,rgb(13_36_24/0.85))] px-4 pt-10 pb-3 text-sm font-semibold text-white opacity-0 transition-[opacity,transform] duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
                        {image.caption}
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="galeri-produk" className="py-8 lg:py-12">
        <Container>
          <h2 id="galeri-produk" className="text-[2rem] sm:text-5xl">
            Sayur dalam kemasan
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {products.map((product, index) => (
              <li key={product.id} className="relative">
                <figure className={`rounded-card bg-surface p-2 ${index % 2 ? "rotate-1" : "-rotate-1"}`}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.2rem] bg-mint-100">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
                      className="object-cover object-[50%_70%]"
                    />
                  </div>
                  <figcaption className="flex flex-wrap items-center justify-between gap-1.5 px-1.5 pt-2 pb-1">
                    <span className="font-display font-bold">{product.name}</span>
                    <PriceTag price={product.price} className="px-2.5 py-0.5 text-sm shadow-none" />
                  </figcaption>
                </figure>
                {product.bestSeller && <BestSellerBadge size="sm" className="absolute -top-3 -left-2" />}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/produk">Lihat harga &amp; pesan</ButtonLink>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-surface px-6 font-bold ring-1 ring-fg/10 hover:ring-fg/30"
            >
              <InstagramIcon className="size-5" />
              Foto terbaru di {siteConfig.instagram.handle}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
