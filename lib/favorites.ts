// "Store" dos favoritos no localStorage.
// Todos os componentes que usam useFavorites() são avisados quando a lista muda.
import type { PokemonSummary } from "@/types/pokemon";

export const FAVORITES_KEY = "favorites";
const EVENT = "favorites-change";

export function readFavoritesRaw(): string {
  try {
    return localStorage.getItem(FAVORITES_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

export function parseFavorites(raw: string): PokemonSummary[] {
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function save(list: PokemonSummary[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT));
}

export function toggleFavorite(card: PokemonSummary) {
  const list = parseFavorites(readFavoritesRaw());
  const exists = list.some((c) => c.id === card.id);
  // Guarda só os campos da listagem (mesmo vindo da página de detalhes)
  const { id, name, hp, types, nationalPokedexNumbers, images } = card;
  save(
    exists
      ? list.filter((c) => c.id !== id)
      : [...list, { id, name, hp, types, nationalPokedexNumbers, images: { small: images.small, large: images.large } }],
  );
}

export function clearFavorites() {
  localStorage.removeItem(FAVORITES_KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback); // outra aba alterou
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
