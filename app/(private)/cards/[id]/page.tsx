import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import { ErrorState } from "@/components/States";
import TypeBadge from "@/components/TypeBadge";
import { fetchCardById, formatPokedex } from "@/lib/api";
import type { Pokemon } from "@/types/pokemon";

export default async function CardDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // no Next 15+ params é uma Promise

  let card: Pokemon | null;
  try {
    card = await fetchCardById(id);
  } catch (error) {
    console.error(error);
    return <ErrorState message="Não foi possível carregar esta carta." />;
  }

  if (!card) notFound();

  const infos: [string, string][] = [
    ["Nº Pokédex", formatPokedex(card.nationalPokedexNumbers)],
    ["Categoria", [card.supertype, ...(card.subtypes ?? [])].join(" · ")],
    ["Evolui de", card.evolvesFrom ?? "—"],
    ["Coleção", `${card.set.name} (${card.set.series})`],
    ["Número na coleção", `${card.number}/${card.set.printedTotal}`],
    ["Lançamento", card.set.releaseDate],
    ["Raridade", card.rarity ?? "—"],
    ["Ilustrador", card.artist ?? "—"],
    ["Fraqueza", card.weaknesses?.map((w) => `${w.type} ${w.value}`).join(", ") ?? "—"],
    ["Resistência", card.resistances?.map((r) => `${r.type} ${r.value}`).join(", ") ?? "—"],
    ["Custo de recuo", card.retreatCost ? String(card.retreatCost.length) : "—"],
  ];

  const marketPrice = Object.values(card.tcgplayer?.prices ?? {}).find((p) => p.market)?.market;

  return (
    <article>
      <Link href="/cards" className="text-sm text-slate-500 hover:text-slate-900">
        ← Voltar para as cartas
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="relative mx-auto aspect-[245/342] w-full max-w-sm">
          <Image
            src={card.images.large}
            alt={`Carta ${card.name}`}
            fill
            unoptimized
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="rounded-xl object-contain drop-shadow-xl"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-400">{formatPokedex(card.nationalPokedexNumbers)}</p>
          <h1 className="text-3xl font-bold">{card.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {card.types?.map((type) => <TypeBadge key={type} type={type} />)}
            <span className="font-bold text-brand">HP {card.hp ?? "—"}</span>
            {marketPrice && (
              <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-medium text-green-700">
                Mercado: US$ {marketPrice.toFixed(2)}
              </span>
            )}
          </div>

          {card.flavorText && <p className="mt-4 italic text-slate-600">“{card.flavorText}”</p>}

          <div className="mt-6">
            <FavoriteButton card={card} variant="full" />
          </div>

          {(card.abilities?.length || card.attacks?.length) && (
            <section className="mt-6 space-y-3">
              {card.abilities?.map((ability) => (
                <div key={ability.name} className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                  <p className="font-semibold">
                    <span className="text-purple-600">{ability.type}:</span> {ability.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{ability.text}</p>
                </div>
              ))}
              {card.attacks?.map((attack) => (
                <div key={attack.name} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{attack.name}</p>
                    <span className="font-bold">{attack.damage}</span>
                  </div>
                  <p className="text-xs text-slate-500">Custo: {attack.cost.join(", ")}</p>
                  {attack.text && <p className="mt-1 text-sm text-slate-700">{attack.text}</p>}
                </div>
              ))}
            </section>
          )}

          <dl className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {infos.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 px-4 py-2 text-sm">
                <dt className="text-slate-500">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}
