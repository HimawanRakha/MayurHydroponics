import { PageIntro } from "@/components/layout/PageIntro";
import { ArticleCard } from "@/components/publication/ArticleCard";
import { ArticleList } from "@/components/publication/ArticleList";
import { Container } from "@/components/ui/primitives";
import { getActiveCategories, getPublishedArticles } from "@/lib/publications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Publikasi",
  description:
    "Artikel dan catatan dari kebun Mayur Hydroponics Purwokerto: edukasi hidroponik, kegiatan di greenhouse, serta informasi produk dan panen.",
  path: "/publikasi",
});

export default function PublikasiPage() {
  const articles = getPublishedArticles();

  return (
    <>
      <PageIntro
        crumbs={[{ name: "Publikasi", path: "/publikasi" }]}
        tone="lime"
        title="Catatan dari kebun Mayur"
        lead={<p>Edukasi hidroponik, kegiatan di greenhouse, dan kabar tentang sayur yang kami tanam.</p>}
      />
      <section aria-label="Daftar publikasi" className="pb-12 lg:pb-16">
        <Container>
          {articles.length === 0 ? (
            <p className="text-fg-muted">Belum ada publikasi. Ikuti Instagram kami untuk kabar terbaru dari kebun.</p>
          ) : (
            <ArticleList
              categories={[...getActiveCategories()]}
              items={articles.map((article) => ({
                slug: article.slug,
                category: article.category,
                card: <ArticleCard article={article} headingLevel="h2" />,
              }))}
            />
          )}
        </Container>
      </section>
    </>
  );
}
