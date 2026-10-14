"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon, WhatsAppIcon } from "@/components/ui/primitives";
import { siteConfig } from "@/lib/site-config";

/**
 * Phones: round WhatsApp button for quick questions.
 * Wider screens: shortcut to the order builder (hidden on the product page, where the builder lives).
 */
export function FloatingOrderButton() {
  const pathname = usePathname();

  return (
    <>
      <a
        href={siteConfig.whatsapp.href("Halo Mayur Hydroponics, saya ingin bertanya.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Tanya lewat WhatsApp"
        className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-primary text-on-primary shadow-float ring-4 ring-white/70 transition-transform hover:-translate-y-1 sm:hidden"
      >
        <WhatsAppIcon className="size-7" />
      </a>
      {pathname !== "/produk" && (
        <Link
          href="/produk#pesan"
          className="fixed right-6 bottom-6 z-30 hidden items-center gap-2.5 rounded-full bg-highlight py-2 pr-5 pl-2 font-bold text-on-highlight shadow-float ring-4 ring-white/70 transition-transform hover:-translate-y-1 sm:flex"
        >
          <span className="grid size-11 place-items-center rounded-full bg-leaf-950 text-highlight">
            <Icon name="cart" className="size-6" />
          </span>
          Susun pesanan
        </Link>
      )}
    </>
  );
}
