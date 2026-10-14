import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container, JsonLd } from "@/components/ui/primitives";
import { LeafMark } from "@/components/ui/promo";
import type { SiteImage } from "@/lib/images";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

const tones = {
  dark: { panel: "bg-inverse-bg text-inverse-fg", muted: "text-inverse-muted", title: "text-highlight", leaf: "text-white/[0.05]" },
  mint: { panel: "bg-mint-100 text-fg", muted: "text-fg-muted", title: "", leaf: "text-leaf-950/[0.05]" },
  lime: { panel: "bg-highlight text-on-highlight", muted: "text-on-highlight/80", title: "", leaf: "text-leaf-950/[0.08]" },
} as const;

/** Rounded intro panel for inner pages: breadcrumb (+ JSON-LD), H1, lead, optional photo. */
export function PageIntro({
  crumbs,
  title,
  lead,
  image,
  tone = "mint",
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: ReactNode;
  image?: SiteImage;
  tone?: keyof typeof tones;
  children?: ReactNode;
}) {
  const t = tones[tone];
  return (
    <Container className="pt-6 pb-8 sm:pt-8 lg:pb-12">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <div className={`relative grid items-center gap-8 overflow-hidden rounded-panel p-6 sm:p-10 lg:p-14 ${t.panel} ${image ? "lg:grid-cols-12" : ""}`}>
        <LeafMark className={`pointer-events-none absolute -right-16 -bottom-20 size-80 ${t.leaf}`} />
        <div className={`relative ${image ? "lg:col-span-7" : ""}`}>
          <nav aria-label="Breadcrumb">
            <ol className={`flex flex-wrap items-center gap-x-2 text-sm font-semibold ${t.muted}`}>
              <li>
                <Link href="/" className="py-2 underline-offset-2 hover:underline">
                  Beranda
                </Link>
              </li>
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                return (
                  <li key={crumb.path} className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    {last ? (
                      <span aria-current="page" className="line-clamp-1">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link href={crumb.path} className="py-2 underline-offset-2 hover:underline">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <h1 className={`mt-4 max-w-4xl text-[2.1rem] sm:text-5xl lg:text-6xl ${t.title}`}>{title}</h1>
          {lead && <div className={`mt-4 max-w-2xl sm:text-xl ${t.muted}`}>{lead}</div>}
          {children}
        </div>
        {image && (
          <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-sm lg:col-span-5 lg:max-w-none">
            <div className="relative aspect-[4/3] rotate-2 overflow-hidden rounded-card shadow-float ring-8 ring-white/90">
              <Image src={image.src} alt={image.alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
