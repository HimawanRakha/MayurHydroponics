"use client";

import { useState, type ReactNode } from "react";

/**
 * Category filter over a server-rendered list. Every article stays in the HTML
 * for crawlers; filtering only hides items for the visitor.
 */
export function ArticleList({
  categories,
  items,
}: {
  categories: string[];
  items: { slug: string; category: string; card: ReactNode }[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? items.filter((item) => item.category === active) : items;

  return (
    <>
      {categories.length > 1 && (
        <div role="group" aria-label="Filter kategori" className="flex flex-wrap gap-2">
          {[null, ...categories].map((category) => {
            const pressed = active === category;
            return (
              <button
                key={category ?? "semua"}
                type="button"
                aria-pressed={pressed}
                onClick={() => setActive(category)}
                className="min-h-11 cursor-pointer rounded-full bg-surface px-5 text-sm font-bold transition-colors hover:bg-mint-100 aria-pressed:bg-primary aria-pressed:text-on-primary"
              >
                {category ?? "Semua"}
              </button>
            );
          })}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Menampilkan {visible.length} publikasi{active ? ` dalam kategori ${active}` : ""}.
      </p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.slug} hidden={active !== null && item.category !== active}>
            {item.card}
          </li>
        ))}
      </ul>
    </>
  );
}
