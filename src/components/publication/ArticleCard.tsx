import Image from "next/image";
import Link from "next/link";

import { images } from "@/lib/images";
import { formatDate, type Article } from "@/lib/publications";

type ArticleSummary = Pick<Article, "slug" | "title" | "excerpt" | "coverImage" | "publishedAt" | "category">;

export function ArticleCard({
  article,
  size = "default",
  headingLevel = "h3",
}: {
  article: ArticleSummary;
  size?: "default" | "large" | "compact";
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const cover = images[article.coverImage];
  const large = size === "large";
  const compact = size === "compact";

  return (
    <article
      className={`group relative h-full overflow-hidden rounded-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-float ${
        large ? "bg-inverse-bg text-inverse-fg" : "bg-surface"
      } ${compact ? "grid grid-cols-[7.5rem_1fr] items-center gap-4 p-2.5 sm:grid-cols-[10rem_1fr]" : "flex flex-col p-2.5"}`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.35rem] bg-mint-100 ${
          large ? "aspect-[16/10]" : compact ? "aspect-square" : "aspect-[3/2]"
        }`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={large ? "(min-width: 1024px) 55vw, 100vw" : compact ? "160px" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={compact ? "py-1 pr-2" : "flex flex-1 flex-col px-3 pt-4 pb-3"}>
        <p className={`text-sm ${large ? "text-inverse-muted" : "text-fg-muted"}`}>
          <span className={`font-semibold ${large ? "text-highlight" : "text-accent"}`}>{article.category}, </span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </p>
        <Heading className={`mt-1.5 ${large ? "text-2xl sm:text-4xl" : "text-lg sm:text-2xl"}`}>
          <Link
            href={`/publikasi/${article.slug}`}
            className={`after:absolute after:inset-0 ${large ? "hover:text-highlight" : "hover:text-primary"}`}
          >
            {article.title}
          </Link>
        </Heading>
        {!compact && (
          <p className={`mt-2 ${large ? "text-inverse-muted" : "text-fg-muted"}`}>{article.excerpt}</p>
        )}
      </div>
    </article>
  );
}
