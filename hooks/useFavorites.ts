"use client";

import { useMemo, useSyncExternalStore } from "react";
import { parseFavorites, readFavoritesRaw, subscribe, toggleFavorite } from "@/lib/favorites";

/**
 * Lê os favoritos do localStorage e re-renderiza quando mudam.
 * No servidor retorna "[]" (não existe localStorage lá), evitando erro de hidratação.
 */
export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, readFavoritesRaw, () => "[]");
  const favorites = useMemo(() => parseFavorites(raw), [raw]);
  const isFavorite = (id: string) => favorites.some((p) => p.id === id);

  return { favorites, isFavorite, toggleFavorite };
}
