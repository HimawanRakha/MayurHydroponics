import Link from "next/link";
import { useId, type ReactNode } from "react";

import { Icon } from "@/components/ui/primitives";

import { formatRupiah } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

/** Leaf mark from the logo, used as a separator and ornament. */
export function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2c2.6 1.7 4 4 4 6.6 0 2-1 3.6-2.6 4.6.4-2.4.1-4.6-1.4-6.6-1.5 2-1.8 4.2-1.4 6.6C9 12.2 8 10.6 8 8.6 8 6 9.4 3.7 12 2Z" />
      <path d="M2.5 8.5c3.3-.4 6 .6 7.6 2.8 1 1.3 1.4 2.9 1.2 4.6L11 21c-2.3-1-4.3-2.6-5.8-4.6C3.7 14.2 2.9 11.6 2.5 8.5ZM21.5 8.5c-3.3-.4-6 .6-7.6 2.8-1 1.3-1.4 2.9-1.2 4.6L13 21c2.3-1 4.3-2.6 5.8-4.6 1.5-2.2 2.3-4.8 2.7-7.9Z" />
    </svg>
  );
}

/**
 * Promo band modelled on the green "fresh vegetable" tape wrapped around the
 * roots of every Mayur pack. Scrolls slowly; static when reduced motion is on.
 */
export function PromoTape({
  items,
  tone = "lime",
  tilt = "-rotate-2",
  className = "",
}: {
  items: string[];
  tone?: "lime" | "leaf";
  tilt?: string;
  className?: string;
}) {
  const colors = tone === "lime" ? "bg-highlight text-on-highlight" : "bg-primary text-on-primary";
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6 font-display text-xl font-bold whitespace-nowrap sm:text-2xl">
          {item}
          <LeafMark className="size-6 opacity-80" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-x-clip py-6 ${className}`}>
      <div className={`relative z-10 -mx-4 overflow-hidden py-4 shadow-float ${colors} ${tilt}`}>
        <div className="flex w-max animate-tape hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}

/** Round sticker with lowercase text running around the edge, like the wordmark. */
export function PromoSticker({
  ring,
  children,
  className = "",
}: {
  ring: string;
  children: ReactNode;
  className?: string;
}) {
  const pathId = useId();
  return (
    <div className={`relative grid place-items-center rounded-full bg-highlight text-on-highlight shadow-float ${className}`}>
      <svg viewBox="0 0 120 120" aria-hidden="true" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id={pathId} d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <text className="fill-current font-display text-[11.5px] font-bold tracking-[0.12em]">
          <textPath href={`#${pathId}`}>{ring}</textPath>
        </text>
      </svg>
      <div className="relative px-6 text-center leading-tight">{children}</div>
    </div>
  );
}

/** Grocery-style price tag that overlaps a product photo. */
export function PriceTag({ price, prefix, className = "" }: { price: number; prefix?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 rounded-full bg-highlight px-3.5 py-1.5 font-display text-lg font-extrabold text-on-highlight shadow-float tabular-nums ${className}`}
    >
      {prefix && <span className="text-[0.7em] font-bold">{prefix}</span>}
      {formatRupiah(price)}
    </span>
  );
}

/** Highlighted free-delivery offer: big number, short line, terms. */
export function FreeDeliveryCard({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-card bg-highlight p-5 text-on-highlight ${className}`}>
      <LeafMark className="absolute -right-4 -bottom-6 size-28 text-leaf-950/10" />
      <p className="font-display text-2xl leading-tight font-extrabold">Gratis ongkir se-Purwokerto*</p>
      <p className="mt-1 font-semibold">Cukup belanja {siteConfig.promos.freeDelivery.minPacks} bungkus sayur, kami antar sampai depan pintu.</p>
    </div>
  );
}

/** 16-point starburst seal for best-selling products. */
export function BestSellerBadge({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const dims = { sm: "size-16 text-[0.62rem]", md: "size-20 text-[0.72rem]", lg: "size-28 text-sm" }[size];
  const points = Array.from({ length: 32 }, (_, i) => {
    const r = i % 2 === 0 ? 50 : 42;
    const a = (Math.PI * i) / 16;
    return `${(50 + r * Math.sin(a)).toFixed(2)},${(50 - r * Math.cos(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <span className={`grid shrink-0 -rotate-12 place-items-center ${dims} ${className}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full drop-shadow-[0_6px_10px_rgb(13_36_24/0.35)]">
        <polygon points={points} className="fill-leaf-950" />
        <circle cx="50" cy="50" r="35" className="fill-none stroke-highlight" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
      <span className="relative text-center leading-none font-extrabold text-highlight">
        <Icon name="star" className="mx-auto mb-0.5 size-[1.4em] fill-current" />
        best
        <br />
        seller
      </span>
    </span>
  );
}

/** Large, obvious entry point to the order builder. */
export function OrderCta({ className = "", tone = "lime" }: { className?: string; tone?: "lime" | "dark" }) {
  const colors =
    tone === "lime"
      ? "bg-highlight text-on-highlight"
      : "bg-inverse-bg text-inverse-fg";
  const iconColors = tone === "lime" ? "bg-leaf-950 text-highlight" : "bg-highlight text-on-highlight";
  return (
    <Link
      href="/produk#pesan"
      className={`group flex items-center gap-4 rounded-full py-3 pr-7 pl-3 shadow-float transition-transform duration-200 hover:-translate-y-1 ${colors} ${className}`}
    >
      <span className={`grid size-14 shrink-0 place-items-center rounded-full transition-transform group-hover:-rotate-12 ${iconColors}`}>
        <Icon name="cart" className="size-7" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-xl font-extrabold sm:text-2xl">Susun pesanan</span>
        <span className="block text-sm font-semibold opacity-80">Pilih sayur, kirim daftarnya ke WhatsApp</span>
      </span>
    </Link>
  );
}
