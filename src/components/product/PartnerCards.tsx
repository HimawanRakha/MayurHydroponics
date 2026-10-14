import { Icon } from "@/components/ui/primitives";
import { LeafMark } from "@/components/ui/promo";
import { siteConfig } from "@/lib/site-config";

/** Reseller (lime, big number) and consignment (teal) offers. */
export function PartnerCards() {
  return (
    <div className="grid gap-5 md:grid-cols-5">
      <div className="relative overflow-hidden rounded-panel bg-highlight p-6 text-on-highlight sm:p-10 md:col-span-3">
        <LeafMark className="absolute -right-10 -bottom-14 size-64 text-leaf-950/10" />
        <h3 className="text-2xl sm:text-3xl">Mitra reseller</h3>
        <p className="mt-4 flex items-end gap-3">
          <span className="font-display text-7xl leading-[0.8] sm:text-8xl font-extrabold tracking-tight">
            {siteConfig.promos.reseller.minPacks}
          </span>
          <span className="pb-1 text-xl leading-tight font-bold">
            bungkus,
            <br />
            langsung harga mitra*
          </span>
        </p>
        <p className="relative mt-6 max-w-md font-semibold">
          Anda menentukan sendiri harga jual kembali dan keuntungannya. Makin banyak membeli, makin besar peluang
          untungnya.
        </p>
      </div>
      <div className="flex flex-col rounded-panel bg-teal-100 p-6 sm:p-10 md:col-span-2">
        <span className="grid size-14 place-items-center rounded-full bg-surface text-accent">
          <Icon name="store" className="size-7" />
        </span>
        <h3 className="mt-6 text-2xl sm:text-3xl">Mitra konsinyasi</h3>
        <p className="mt-3">
          Lengkapi etalase toko Anda dengan sayur dari Mayur Hydroponics. Skema pasokan dan pembayaran kita bicarakan
          bersama.
        </p>
      </div>
    </div>
  );
}
