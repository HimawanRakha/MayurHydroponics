"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/site-config";

export function NavLinks({
  className = "",
  linkClassName = "rounded-full px-4 py-2.5 hover:bg-mint-100 aria-[current=page]:bg-mint-100 aria-[current=page]:text-primary",
  onNavigate,
}: {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {navigation.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className={`block transition-colors ${linkClassName}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
