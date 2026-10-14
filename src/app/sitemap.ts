import type { MetadataRoute } from "next";

import { getPublishedArticles } from "@/lib/publications";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/tentang-kami", "/produk", "/publikasi", "/galeri", "/kontak"].map((path) => ({
    url: absoluteUrl(path),
  }));

  const articles = getPublishedArticles().map((article) => ({
    url: absoluteUrl(`/publikasi/${article.slug}`),
    lastModified: article.updatedAt ?? article.publishedAt,
  }));

  return [...pages, ...articles];
}
