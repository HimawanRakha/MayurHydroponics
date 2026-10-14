import Image from "next/image";
import Link from "next/link";

import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { NavLinks } from "@/components/layout/NavLinks";
import { WhatsAppButton } from "@/components/ui/primitives";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-5 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
      >
        Langsung ke konten
      </a>
      <div className="mx-auto flex h-[var(--header-height)] max-w-[80rem] items-center justify-between gap-4 rounded-full bg-surface pr-2 pl-5 shadow-float sm:pl-7">
        <Link href="/" className="shrink-0" aria-label={`${siteConfig.name}, ke beranda`}>
          <Image src={siteConfig.logo} alt="" width={719} height={347} loading="eager" fetchPriority="high" className="h-[3.7rem] w-auto" />
        </Link>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <NavLinks className="flex items-center gap-1 text-[0.95rem] font-semibold" />
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton className="min-h-11 px-5 py-2.5 text-sm shadow-none" />
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
