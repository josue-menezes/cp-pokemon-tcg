import type { ResponsePokemonDetail, ResponsePokemonList, Pokemon } from "@/types/pokemon";

export const API_URL = "https://api.pokemontcg.io/v2/cards";
export const PAGE_SIZE = 15; // enunciado: NO MÁXIMO 15 cartas

/** A API às vezes responde 500/502/504: tenta de novo até 3 vezes antes de desistir. */
async function fetchWithRetry(url: string, signal?: AbortSignal, attempts = 3): Promise<Response> {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { signal });
      if (res.status < 500 || i >= attempts) return res;
    } catch (error) {
      if (signal?.aborted || i >= attempts) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 600 * i));
  }
}

// Só os campos da listagem: resposta bem menor e mais rápida
const LIST_FIELDS = "id,name,hp,types,nationalPokedexNumbers,images";

/** Monta o filtro q= da API. Ex: "char" -> name:char* (acha Charizard, Charmander...) */
function buildQuery(search: string) {
  const term = search.trim().replace(/["\\]/g, "");
  if (!term) return "";
  // Com espaço precisa de aspas (ex: "mr. mime"); sem espaço usa * para busca parcial
  return term.includes(" ") ? `name:"${term}"` : `name:${term}*`;
}

/** Lista inicial (sem texto) ou busca por nome. Sempre no máximo 15. */
export async function fetchCards(search = "", signal?: AbortSignal): Promise<ResponsePokemonList> {
  const params = new URLSearchParams({
    orderBy: "number,name",
    pageSize: String(PAGE_SIZE),
    page: "1",
    select: LIST_FIELDS,
  });
  const q = buildQuery(search);
  if (q) params.set("q", q);

  const res = await fetchWithRetry(`${API_URL}?${params}`, signal);
  if (!res.ok) throw new Error(`Erro ${res.status} ao buscar cartas`);
  return res.json();
}

/** Carta completa pelo id. Retorna null se não existir. */
export async function fetchCardById(id: string): Promise<Pokemon | null> {
  const res = await fetchWithRetry(`${API_URL}/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Erro ${res.status} ao buscar a carta`);
  const json: ResponsePokemonDetail = await res.json();
  return json.data;
}

export const formatPokedex = (numbers?: number[]) =>
  numbers?.[0] ? `#${String(numbers[0]).padStart(3, "0")}` : "#—";
