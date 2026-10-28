import type { PokemonSummary } from "@/types/pokemon";
import CardItem from "./CardItem";

export default function CardGrid({ cards }: { cards: PokemonSummary[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {cards.map((card) => (
        <li key={card.id}>
          <CardItem card={card} />
        </li>
      ))}
    </ul>
  );
}
