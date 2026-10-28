"use client";

import { useFavorites } from "@/hooks/useFavorites";
import type { PokemonSummary } from "@/types/pokemon";

interface Props {
  card: PokemonSummary;
  variant?: "icon" | "full";
}

export default function FavoriteButton({ card, variant = "icon" }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(card.id);
  const label = active ? "Remover dos favoritos" : "Adicionar aos favoritos";

  if (variant === "full") {
    return (
      <button
        onClick={() => toggleFavorite(card)}
        aria-pressed={active}
        className={`w-full rounded-lg px-4 py-3 font-semibold transition sm:w-auto ${
          active
            ? "bg-red-50 text-brand ring-1 ring-red-200 hover:bg-red-100"
            : "bg-brand text-white hover:bg-brand-dark"
        }`}
      >
        {active ? "★ Favoritada (clique para remover)" : "☆ Favoritar carta"}
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // o card é um link: não abrir a página ao favoritar
        toggleFavorite(card);
      }}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 items-center justify-center rounded-full text-lg shadow-md ${
        active ? "bg-yellow-400 text-slate-900" : "bg-white/90 text-slate-400 hover:text-yellow-500"
      }`}
    >
      {active ? "★" : "☆"}
    </button>
  );
}
