import fs from "node:fs";
import path from "node:path";

import { marked } from "marked";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

import { isImageKey, type ImageKey } from "@/lib/images";

/**
 * Articles live in src/content/articles/*.md. To publish a new one, add a file
 * with the frontmatter below and set `status: published`. See docs/content-plan.md.
 */
const ARTICLES_DIR = path.join(process.cwd(), "src", "content", "articles");

export const categories = [
  "Kegiatan Mayur",
  "Edukasi Hidroponik",
  "Produk dan Panen",
  "Cerita Usaha",
  "Kolaborasi dan Berita",
] as const;

export type Category = (typeof categories)[number];

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Gunakan format YYYY-MM-DD");

const frontmatterSchema = z.object({
  title: z.string().min(10),
  excerpt: z.string().min(40).max(220),
  coverImage: z.string().refine(isImageKey, "coverImage harus salah satu key di src/lib/images.ts"),
  publishedAt: isoDate,
  updatedAt: isoDate.optional(),
  category: z.enum(categories),
  author: z.string().optional(),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(170).optional(),
  instagramUrl: z.string().url().optional(),
});

export type Article = Omit<z.infer<typeof frontmatterSchema>, "coverImage"> & {
  slug: string;
  coverImage: ImageKey;
  html: string;
  readingMinutes: number;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function loadArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      if (!slugPattern.test(slug)) {
        throw new Error(`Nama file artikel "${file}" harus huruf kecil dan tanda hubung saja.`);
      }
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
      const match = raw.match(frontmatterPattern);
      if (!match) throw new Error(`${file} harus diawali frontmatter di antara baris "---".`);
      const [, yamlBlock, content] = match;
      const data: unknown = parseYaml(yamlBlock);
      const parsed = frontmatterSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Frontmatter tidak valid di ${file}:\n${z.prettifyError(parsed.error)}`);
      }
      const words = content.trim().split(/\s+/).length;
      return {
        ...parsed.data,
        coverImage: parsed.data.coverImage as ImageKey,
        slug,
        html: marked.parse(content, { async: false }),
        readingMinutes: Math.max(1, Math.round(words / 200)),
      };
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

const allArticles = loadArticles();

/** Only published articles are visible on the public site and in the sitemap. */
export function getPublishedArticles() {
  return allArticles.filter((article) => article.status === "published");
}

export function getArticle(slug: string) {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 2) {
  const others = getPublishedArticles().filter((a) => a.slug !== article.slug);
  return [
    ...others.filter((a) => a.category === article.category),
    ...others.filter((a) => a.category !== article.category),
  ].slice(0, limit);
}

/** Categories that actually have published articles. */
export function getActiveCategories() {
  const used = new Set(getPublishedArticles().map((a) => a.category));
  return categories.filter((c) => used.has(c));
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export function formatDate(isoDay: string) {
  return dateFormatter.format(new Date(`${isoDay}T00:00:00+07:00`));
}
