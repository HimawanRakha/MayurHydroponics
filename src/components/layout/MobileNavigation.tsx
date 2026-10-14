"use client";

import { useEffect, useId, useRef, useState } from "react";

import { NavLinks } from "@/components/layout/NavLinks";
import { InstagramIcon, WhatsAppButton } from "@/components/ui/primitives";
import { siteConfig } from "@/lib/site-config";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 text-[0.95rem] font-bold text-on-primary"
      >
        <span>{open ? "Tutup" : "Menu"}</span>
        <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 7h14M3 13h14" />}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-3 top-[calc(var(--header-height)+1.25rem)] bottom-3 overflow-y-auto rounded-panel bg-inverse-bg text-inverse-fg shadow-float"
      >
        <nav aria-label="Navigasi utama" className="flex min-h-full flex-col px-6 pt-6 pb-8">
          <NavLinks
            onNavigate={() => setOpen(false)}
            className="space-y-1 font-display text-3xl font-bold"
            linkClassName="py-2.5 hover:text-highlight aria-[current=page]:text-highlight"
          />
          <div className="mt-auto flex flex-col gap-4 pt-10">
            <WhatsAppButton variant="highlight" className="w-full" />
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 font-semibold"
            >
              <InstagramIcon className="size-5" />
              {siteConfig.instagram.handle} di Instagram
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
