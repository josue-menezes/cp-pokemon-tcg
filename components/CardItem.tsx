import Link from "next/link";
import { formatPokedex } from "@/lib/api";
import type { PokemonSummary } from "@/types/pokemon";
import CardImage from "./CardImage";
import FavoriteButton from "./FavoriteButton";
import TypeBadge from "./TypeBadge";

export default function CardItem({ card }: { card: PokemonSummary }) {
  return (
    <Link
      href={`/cards/${card.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="absolute right-4 top-4 z-10">
        <FavoriteButton card={card} />
      </div>

      <div className="relative aspect-[245/342] w-full">
        <CardImage
          images={card.images}
          name={card.name}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-2">
        <h2 className="font-semibold leading-tight">
          <span className="text-slate-400">{formatPokedex(card.nationalPokedexNumbers)}</span> {card.name}
        </h2>
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {card.types?.map((type) => <TypeBadge key={type} type={type} />)}
          </div>
          <span className="shrink-0 text-sm font-bold text-brand">HP {card.hp ?? "—"}</span>
        </div>
      </div>
    </Link>
  );
}
