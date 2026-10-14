import Image from "next/image";

import { BestSellerBadge, PriceTag } from "@/components/ui/promo";
import { products } from "@/lib/products";

const cardTints = ["bg-mint-100", "bg-lime-100", "bg-teal-100"] as const;

/** Product cards: packaged vegetable on a tinted tile, price tag overlapping the photo like a market label. */
export function ProductSpecimens({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {products.map((product, index) => (
        <li key={product.id} id={`sayur-${product.id}`} className="group">
          <article
            className={`relative flex h-full flex-col rounded-[1.4rem] p-2 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-float sm:rounded-card sm:p-2.5 ${
              product.bestSeller ? "bg-inverse-bg text-inverse-fg" : "bg-surface"
            }`}
          >
            <div
              className={`relative aspect-[4/5] overflow-hidden rounded-[1.1rem] sm:rounded-[1.35rem] ${cardTints[index % cardTints.length]}`}
            >
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                  product.imageKind === "kemasan" ? "object-[50%_70%]" : ""
                }`}
              />
              <PriceTag
                price={product.price}
                className="absolute top-2 right-2 rotate-[-6deg] px-2.5 py-1 text-sm sm:top-3 sm:right-3 sm:px-3.5 sm:text-lg"
              />
            </div>
            {product.bestSeller && (
              <BestSellerBadge size="sm" className="absolute -top-3 -left-2 z-10 sm:-top-4 sm:-left-3 sm:size-20 sm:text-[0.72rem]" />
            )}
            <div className="flex flex-1 flex-col px-1.5 pt-2.5 pb-1.5 sm:px-2 sm:pt-3 sm:pb-2">
              <Heading className="text-lg sm:text-2xl">{product.name}</Heading>
              <p className={`text-xs italic sm:text-sm ${product.bestSeller ? "text-inverse-muted" : "text-fg-muted"}`}>
                {product.botanicalName}
              </p>
              <p className="mt-2 hidden text-sm sm:block">{product.use}</p>
              <p className={`mt-auto pt-2 text-sm font-bold ${product.bestSeller ? "text-highlight" : "text-primary"}`}>
                min. {product.minWeight} g / bungkus
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
