import CardSearch from "@/components/CardSearch";
import { fetchCards } from "@/lib/api";
import type { PokemonSummary } from "@/types/pokemon";

export default async function CardsPage() {
  // Lista pré-carregada no servidor (GET na API, máximo 15 cartas)
  let initialCards: PokemonSummary[] = [];
  let initialError = false;

  try {
    const res = await fetchCards();
    initialCards = res.data;
  } catch (error) {
    console.error(error);
    initialError = true;
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Cartas Pokémon</h1>
      <CardSearch initialCards={initialCards} initialError={initialError} />
    </>
  );
}
