import { ButtonLink, Container, WhatsAppButton } from "@/components/ui/primitives";
import { LeafMark } from "@/components/ui/promo";
import { navigation } from "@/lib/site-config";

export default function NotFound() {
  return (
    <Container className="py-8 lg:py-12">
      <div className="relative overflow-hidden rounded-panel bg-inverse-bg p-8 text-inverse-fg sm:p-12 lg:p-16">
        <LeafMark className="pointer-events-none absolute -right-16 -bottom-20 size-96 text-white/[0.05]" />
        <p className="font-display text-7xl font-extrabold text-highlight sm:text-8xl">404</p>
        <h1 className="mt-4 max-w-3xl text-[2rem] sm:text-5xl">Halaman ini tidak ada di kebun kami</h1>
        <p className="mt-5 max-w-xl text-lg text-inverse-muted">
          Alamatnya mungkin salah ketik atau halamannya sudah dipindah. Coba buka salah satu halaman berikut.
        </p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="highlight">
            Kembali ke beranda
          </ButtonLink>
          <WhatsAppButton variant="inverse">Tanya lewat WhatsApp</WhatsAppButton>
        </div>
        <ul className="relative mt-8 flex flex-wrap gap-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <ButtonLink href={item.href} variant="secondary" className="min-h-11 py-2 text-sm">
                {item.label}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
