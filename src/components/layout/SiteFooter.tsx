import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";

import { Container, InstagramIcon, WhatsAppIcon } from "@/components/ui/primitives";
import { LeafMark } from "@/components/ui/promo";
import { fullAddress, mapsUrl, navigation, siteConfig } from "@/lib/site-config";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-[80rem] overflow-hidden rounded-panel bg-inverse-bg text-inverse-fg">
        <LeafMark className="pointer-events-none absolute -right-16 -bottom-24 size-[26rem] text-white/[0.04]" />
        <Container className="relative grid gap-12 py-14 md:grid-cols-12 lg:py-16">
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label={`${siteConfig.name}, ke beranda`}
              className="inline-block rounded-card bg-surface px-6 py-4 transition-transform hover:-rotate-2"
            >
              <Image src={siteConfig.logo} alt="" width={719} height={347} className="h-20 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-inverse-muted">{siteConfig.shortDescription}</p>
            <a
              href={siteConfig.whatsapp.href("Halo Mayur Hydroponics, saya mau pesan sayur.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-highlight px-6 font-bold text-on-highlight transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="size-5" />
              Pesan sayur sekarang
            </a>
          </div>

          <nav aria-label="Navigasi footer" className="md:col-span-3">
            <h2 className="font-display text-xl">Halaman</h2>
            <ul className="mt-3 space-y-0.5">
              <li>
                <Link href="/" className="inline-block py-1.5 text-inverse-muted hover:text-highlight">
                  Beranda
                </Link>
              </li>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-1.5 text-inverse-muted hover:text-highlight">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-display text-xl">Hubungi kami</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={siteConfig.whatsapp.href()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 hover:text-highlight"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-white/10">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  {siteConfig.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 hover:text-highlight"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-white/10">
                    <InstagramIcon className="size-5" />
                  </span>
                  {siteConfig.instagram.handle}
                </a>
              </li>
              <li className="pt-2">
                <address className="not-italic text-inverse-muted">
                  {siteConfig.address.label}: {fullAddress}
                </address>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block py-1.5 font-semibold text-highlight underline hover:no-underline"
                >
                  Buka di Google Maps
                </a>
              </li>
            </ul>
          </div>
        </Container>
        <Container className="relative pb-8 text-sm text-inverse-muted">
          <p className="rounded-full bg-white/5 px-5 py-3">
            © <CopyrightYear /> {siteConfig.name}, Purwokerto.
          </p>
        </Container>
      </div>
    </footer>
  );
}
