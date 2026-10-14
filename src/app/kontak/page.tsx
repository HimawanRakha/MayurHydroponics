import { PageIntro } from "@/components/layout/PageIntro";
import { Container, Icon, InstagramIcon, TermsNote, WhatsAppButton, WhatsAppIcon } from "@/components/ui/primitives";
import { FreeDeliveryCard } from "@/components/ui/promo";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, mapsUrl, siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Kontak & Lokasi",
  description: `Hubungi Mayur Hydroponics lewat WhatsApp ${siteConfig.whatsapp.display} atau Instagram. Kantor pemasaran di Perumahan Puri Hijau, Karangklesem, Purwokerto Selatan.`,
  path: "/kontak",
});

export default function KontakPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ name: "Kontak", path: "/kontak" }]}
        tone="lime"
        image={images.pokcoyKeranjang}
        title="Hubungi Mayur Hydroponics"
        lead={<p>Cara tercepat memesan atau bertanya adalah lewat WhatsApp.</p>}
      />

      <section aria-label="Kontak" className="pb-8 lg:pb-12">
        <Container className="grid gap-5 md:grid-cols-3">
          <div className="flex flex-col rounded-panel bg-inverse-bg p-7 text-inverse-fg sm:p-8">
            <span className="grid size-14 place-items-center rounded-full bg-highlight text-on-highlight">
              <WhatsAppIcon className="size-7" />
            </span>
            <h2 className="mt-5 text-2xl sm:mt-6 sm:text-3xl">WhatsApp</h2>
            <p className="mt-1 font-display text-2xl font-bold text-highlight tabular-nums">{siteConfig.whatsapp.display}</p>
            <p className="mt-2 text-inverse-muted">Untuk pesanan, pertanyaan produk, dan kemitraan.</p>
            <WhatsAppButton variant="highlight" className="mt-auto self-start" message="Halo Mayur Hydroponics, saya ingin bertanya.">
              Chat di WhatsApp
            </WhatsAppButton>
          </div>

          <div className="flex flex-col rounded-panel bg-teal-100 p-7 sm:p-8">
            <span className="grid size-14 place-items-center rounded-full bg-surface text-accent">
              <InstagramIcon className="size-7" />
            </span>
            <h2 className="mt-5 text-2xl sm:mt-6 sm:text-3xl">Instagram</h2>
            <p className="mt-1 font-display text-2xl font-bold">{siteConfig.instagram.handle}</p>
            <p className="mt-2 mb-6 text-fg-muted">Foto kebun dan kabar terbaru dari Mayur.</p>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex min-h-12 items-center self-start rounded-full bg-surface px-6 font-bold transition-transform hover:-translate-y-0.5"
            >
              Buka Instagram
            </a>
          </div>

          <div className="flex flex-col rounded-panel bg-surface p-7 sm:p-8">
            <span className="grid size-14 place-items-center rounded-full bg-mint-100 text-primary">
              <Icon name="pin" className="size-7" />
            </span>
            <h2 className="mt-5 text-2xl sm:mt-6 sm:text-3xl">{siteConfig.address.label}</h2>
            <address className="mt-2 not-italic">{fullAddress}</address>
            <p className="mt-2 mb-6 text-fg-muted">
              Ingin mengambil sendiri? Kabari kami lewat WhatsApp terlebih dahulu agar sayur bisa disiapkan.
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex min-h-12 items-center self-start rounded-full bg-primary px-6 font-bold text-on-primary transition-transform hover:-translate-y-0.5"
            >
              Buka di Google Maps
            </a>
          </div>
        </Container>

        <Container className="mt-5 grid gap-5 md:grid-cols-2">
          <FreeDeliveryCard className="p-7 sm:p-8" />
          <div className="rounded-card bg-mint-100 p-7 sm:p-8">
            <h2 className="flex items-center gap-3 text-2xl">
              <Icon name="truck" className="size-7 text-primary" />
              Area pengantaran
            </h2>
            <p className="mt-2">
              Kami mengantar sayur ke rumah Anda di area {siteConfig.serviceArea}. Untuk pesanan di luar Purwokerto,
              tanyakan dulu lewat WhatsApp.
            </p>
          </div>
        </Container>
        <Container>
          <TermsNote className="mt-4" />
        </Container>
      </section>
    </>
  );
}
