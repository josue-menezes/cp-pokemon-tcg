"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import CardGrid from "./CardGrid";
import { EmptyState } from "./States";

export default function FavoritesList() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <EmptyState message="Você ainda não favoritou nenhuma carta.">
        <Link href="/cards" className="mt-3 inline-block text-sm text-brand underline">
          Ver cartas
        </Link>
      </EmptyState>
    );
  }

  return <CardGrid cards={favorites} />;
}
