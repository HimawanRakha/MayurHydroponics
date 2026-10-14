import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageIntro } from "@/components/layout/PageIntro";
import { ArticleCard } from "@/components/publication/ArticleCard";
import { ButtonLink, Container, JsonLd, WhatsAppButton } from "@/components/ui/primitives";
import { images } from "@/lib/images";
import { formatDate, getArticle, getPublishedArticles, getRelatedArticles } from "@/lib/publications";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/publikasi/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Publikasi tidak ditemukan" };

  const cover = images[article.coverImage];
  return pageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    path: `/publikasi/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    image: { url: cover.src.src, width: cover.src.width, height: cover.src.height, alt: cover.alt },
  });
}

/**
 * Published slugs come from generateStaticParams, so their full article HTML is
 * prerendered. Only unknown slugs reach the fallback; Next.js then streams the
 * not-found page with a noindex tag.
 */
export default function ArticlePage({ params }: PageProps<"/publikasi/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

async function ArticleContent({ params }: { params: PageProps<"/publikasi/[slug]">["params"] }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const cover = images[article.coverImage];
  const related = getRelatedArticles(article);
  const isProductArticle = article.category === "Produk dan Panen";

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <article>
        <PageIntro
          crumbs={[
            { name: "Publikasi", path: "/publikasi" },
            { name: article.title, path: `/publikasi/${article.slug}` },
          ]}
          title={article.title}
          lead={<p>{article.excerpt}</p>}
        >
          <p className="mt-6 text-sm text-fg-muted">
            {article.category}. Terbit <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.updatedAt && (
              <>
                , diperbarui <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </>
            )}
            . {article.author ? `Ditulis oleh ${article.author}. ` : ""}Bacaan {article.readingMinutes} menit.
          </p>
        </PageIntro>

        <Container>
          <figure>
            <div className="relative aspect-[16/9] overflow-hidden rounded-panel bg-mint-100 shadow-float">
              <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width: 1240px) 1176px, 100vw" className="object-cover" />
            </div>
            {cover.caption && <figcaption className="mt-2 text-sm text-fg-muted">{cover.caption}</figcaption>}
          </figure>

          <div className="grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
            <div className="prose-mayur min-w-0 lg:col-span-8" dangerouslySetInnerHTML={{ __html: article.html }} />

            <aside className="min-w-0 lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-10">
              <div className="rounded-panel bg-inverse-bg p-6 text-inverse-fg lg:sticky lg:top-[calc(var(--header-height)+1.75rem)]">
                <p className="font-display text-2xl leading-tight font-bold text-highlight">
                  {isProductArticle ? "Mau pesan sayur ini?" : "Ingin mencoba sayur dari kebun kami?"}
                </p>
                <p className="mt-2 text-inverse-muted">Lihat daftar sayur dan harganya, lalu pesan lewat WhatsApp.</p>
                <div className="mt-5 flex flex-col gap-3">
                  <ButtonLink href="/produk#pesan" variant="highlight">
                    Susun pesanan
                  </ButtonLink>
                  <WhatsAppButton variant="inverse" message={`Halo Mayur Hydroponics, saya membaca artikel "${article.title}".`}>
                    Tanya lewat WhatsApp
                  </WhatsAppButton>
                </div>
                {article.instagramUrl && (
                  <a
                    href={article.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block py-2 text-sm font-semibold text-highlight underline"
                  >
                    Lihat unggahan terkait di Instagram
                  </a>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="terkait" className="py-8 lg:py-12">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <h2 id="terkait" className="text-3xl sm:text-4xl">
                Publikasi lainnya
              </h2>
              <ButtonLink href="/publikasi" variant="secondary" className="shrink-0 self-start sm:self-auto">
                Semua publikasi
              </ButtonLink>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
