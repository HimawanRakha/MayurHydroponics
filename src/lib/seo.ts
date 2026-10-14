import type { Metadata } from "next";

import type { Article } from "@/lib/publications";
import { images } from "@/lib/images";
import { priceRange } from "@/lib/products";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the full title as-is instead of appending the brand template. */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Same file as src/app/opengraph-image.jpg, restated because a page-level openGraph replaces the inherited one. */
const defaultOgImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Logo Mayur Hydroponics di samping foto lorong greenhouse berisi deretan pokcoy",
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  image = defaultOgImage,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: absoluteTitle ? title : `${title} | ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [image],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
  };
}

const businessId = absoluteUrl("/#bisnis");

/** LocalBusiness + WebSite graph. Only fields backed by owner-supplied material. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: siteConfig.name,
        description: siteConfig.shortDescription,
        url: absoluteUrl("/"),
        logo: absoluteUrl(siteConfig.logo),
        image: absoluteUrl(images.lorongGreenhouse.src.src),
        telephone: `+${siteConfig.whatsapp.number}`,
        priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.province,
          postalCode: siteConfig.address.postalCode,
          addressCountry: "ID",
        },
        areaServed: { "@type": "City", name: siteConfig.serviceArea },
        sameAs: [siteConfig.instagram.url],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: siteConfig.name,
        url: absoluteUrl("/"),
        inLanguage: "id-ID",
        publisher: { "@id": businessId },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Beranda", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(article: Article) {
  const cover = images[article.coverImage];
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(cover.src.src),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: "id-ID",
    mainEntityOfPage: absoluteUrl(`/publikasi/${article.slug}`),
    author: article.author
      ? { "@type": "Person", name: article.author }
      : { "@type": "Organization", name: siteConfig.name, url: absoluteUrl("/") },
    publisher: { "@id": businessId },
  };
}
