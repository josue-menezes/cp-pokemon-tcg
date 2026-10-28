"use client";

import { useEffect, useRef, useState } from "react";
import { fetchCards } from "@/lib/api";
import type { PokemonSummary } from "@/types/pokemon";
import CardGrid from "./CardGrid";
import { EmptyState, ErrorState, GridSkeleton } from "./States";

interface Props {
  initialCards: PokemonSummary[];
  initialError: boolean;
}

export default function CardSearch({ initialCards, initialError }: Props) {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState(initialCards);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [retry, setRetry] = useState(0); // incrementar = refazer a busca
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Primeira renderização: a lista inicial já veio do servidor
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!initialError) return;
    }

    const controller = new AbortController(); // cancela a busca anterior se continuar digitando

    // Debounce: espera 500ms sem digitar antes de chamar a API
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetchCards(query, controller.signal);
        setCards(res.data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, retry, initialError]);

  function renderContent() {
    if (loading) return <GridSkeleton />;
    if (error)
      return (
        <ErrorState
          message="Não foi possível carregar as cartas. A API pode estar lenta, tente de novo."
          onRetry={() => setRetry((n) => n + 1)}
        />
      );
    if (cards.length === 0)
      return (
        <EmptyState message={`Nenhuma carta encontrada para "${query}".`}>
          <button onClick={() => setQuery("")} className="mt-3 text-sm text-brand underline">
            Limpar busca
          </button>
        </EmptyState>
      );
    return <CardGrid cards={cards} />;
  }

  return (
    <section>
      <div className="relative mb-6">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar carta pelo nome (ex: charizard, pikachu, mew)..."
          aria-label="Buscar cartas"
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>
      {renderContent()}
    </section>
  );
}
