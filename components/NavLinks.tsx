"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";

export default function NavLinks() {
  const pathname = usePathname();
  const { favorites } = useFavorites();

  const links = [
    { href: "/cards", label: "Cartas" },
    { href: "/favorites", label: `Favoritas (${favorites.length})` },
  ];

  return (
    <nav className="flex gap-1 text-sm">
      {links.map((link) => {
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-3 py-1.5 font-medium ${
              active ? "bg-white text-brand" : "text-white hover:bg-white/15"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
