"use client";

import { useState } from "react";

import { Icon, WhatsAppIcon } from "@/components/ui/primitives";

type OrderItem = { id: string; name: string; price: number; minWeight: number; bestSeller?: boolean };

const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
const formatRupiah = (value: number) => rupiah.format(value).replace(/\s/g, "");

const MAX_PER_ITEM = 50;

/**
 * Builds a WhatsApp message from selected vegetables. Nothing is stored or sent
 * anywhere except the wa.me link the visitor chooses to open.
 */
export function OrderBuilder({
  items,
  whatsappNumber,
  freeDeliveryMinPacks,
}: {
  items: OrderItem[];
  whatsappNumber: string;
  freeDeliveryMinPacks: number;
}) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const selected = items.filter((item) => (quantities[item.id] ?? 0) > 0);
  const packs = selected.reduce((sum, item) => sum + quantities[item.id], 0);
  const total = selected.reduce((sum, item) => sum + quantities[item.id] * item.price, 0);
  const packsToFreeDelivery = Math.max(0, freeDeliveryMinPacks - packs);

  const change = (id: string, delta: number) =>
    setQuantities((current) => {
      const next = Math.min(MAX_PER_ITEM, Math.max(0, (current[id] ?? 0) + delta));
      return { ...current, [id]: next };
    });

  const message = [
    "Halo Mayur Hydroponics, saya mau pesan:",
    ...selected.map((item) => `- ${item.name} x${quantities[item.id]}`),
    `Total ${packs} bungkus, perkiraan ${formatRupiah(total)}.`,
    "Mohon info ketersediaan dan jadwal pengantarannya. Alamat saya: ",
  ].join("\n");

  const stepper =
    "grid size-11 cursor-pointer place-items-center rounded-full text-xl font-bold transition-[transform,background-color] hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100";
  const progress = Math.min(1, packs / freeDeliveryMinPacks);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <ul className="grid gap-2.5 sm:grid-cols-2 lg:col-span-7">
        {items.map((item) => {
          const qty = quantities[item.id] ?? 0;
          return (
            <li
              key={item.id}
              className={`flex items-center justify-between gap-3 rounded-card p-3 pl-5 transition-colors ${
                qty > 0 ? "bg-highlight text-on-highlight" : "bg-surface"
              }`}
            >
              <div>
                <p className="font-display text-lg font-bold">
                  {item.name}
                  {item.bestSeller && (
                    <span className={`ml-2 inline-flex items-center gap-0.5 align-middle text-xs font-extrabold ${qty > 0 ? "" : "text-accent"}`}>
                      <Icon name="star" className="size-3.5 fill-current" />
                      best seller
                    </span>
                  )}
                </p>
                <p className={`text-sm ${qty > 0 ? "" : "text-fg-muted"}`}>
                  {formatRupiah(item.price)}, min. {item.minWeight} g
                </p>
              </div>
              <div className="flex items-center gap-1" role="group" aria-label={`Jumlah ${item.name}`}>
                <button
                  type="button"
                  onClick={() => change(item.id, -1)}
                  disabled={qty === 0}
                  aria-label={`Kurangi ${item.name}`}
                  className={`${stepper} bg-surface text-fg ring-1 ring-fg/10`}
                >
                  −
                </button>
                <output aria-live="polite" className="w-8 text-center font-display text-lg font-bold tabular-nums">
                  {qty}
                </output>
                <button
                  type="button"
                  onClick={() => change(item.id, 1)}
                  disabled={qty === MAX_PER_ITEM}
                  aria-label={`Tambah ${item.name}`}
                  className={`${stepper} bg-primary text-on-primary`}
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="lg:col-span-5">
        <div className="rounded-panel bg-inverse-bg p-6 text-inverse-fg shadow-float sm:p-8 lg:sticky lg:top-[calc(var(--header-height)+1.75rem)]">
          <h3 className="text-2xl sm:text-3xl">Ringkasan pesanan</h3>
          {packs === 0 ? (
            <p className="mt-3 text-inverse-muted">Pilih sayur dengan tombol + untuk mulai menyusun pesanan.</p>
          ) : (
            <ul className="mt-4 space-y-1.5">
              {selected.map((item) => (
                <li key={item.id} className="flex justify-between gap-4">
                  <span>
                    {item.name} × {quantities[item.id]}
                  </span>
                  <span className="tabular-nums text-inverse-muted">{formatRupiah(item.price * quantities[item.id])}</span>
                </li>
              ))}
            </ul>
          )}
          <dl className="mt-5 flex items-end justify-between gap-4 rounded-card bg-white/10 px-5 py-4">
            <dt className="text-sm text-inverse-muted">
              Perkiraan total
              <br />
              {packs} bungkus
            </dt>
            <dd className="font-display text-3xl font-extrabold text-highlight tabular-nums sm:text-4xl">{formatRupiah(total)}</dd>
          </dl>

          <div className="mt-5">
            <div
              className="h-2.5 overflow-hidden rounded-full bg-white/15"
              role="progressbar"
              aria-label="Menuju gratis ongkir"
              aria-valuemin={0}
              aria-valuemax={freeDeliveryMinPacks}
              aria-valuenow={Math.min(packs, freeDeliveryMinPacks)}
            >
              <div className="h-full rounded-full bg-highlight transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
            </div>
            <p className="mt-2 text-sm font-semibold" aria-live="polite">
              {packs === 0
                ? `Gratis ongkir area Purwokerto mulai ${freeDeliveryMinPacks} bungkus.*`
                : packsToFreeDelivery > 0
                  ? `Tambah ${packsToFreeDelivery} bungkus lagi untuk gratis ongkir area Purwokerto.*`
                  : "Pesanan ini sudah dapat gratis ongkir area Purwokerto.*"}
            </p>
          </div>

          {packs > 0 ? (
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-highlight px-5 py-3 font-bold text-on-highlight transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="size-5" />
              Kirim pesanan lewat WhatsApp
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-6 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 font-bold text-inverse-muted"
            >
              Kirim pesanan lewat WhatsApp
            </button>
          )}
          <p className="mt-3 text-sm text-inverse-muted">
            Tombol ini membuka WhatsApp dengan pesan yang sudah terisi. Harga final dan ketersediaan dikonfirmasi oleh tim
            Mayur.
          </p>
        </div>
      </div>
    </div>
  );
}
