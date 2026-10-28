// Cor de cada tipo de energia do Pokémon TCG
const TYPE_COLORS: Record<string, string> = {
  Grass: "bg-green-500 text-white",
  Fire: "bg-orange-500 text-white",
  Water: "bg-sky-500 text-white",
  Lightning: "bg-yellow-400 text-slate-900",
  Psychic: "bg-purple-500 text-white",
  Fighting: "bg-amber-700 text-white",
  Darkness: "bg-slate-800 text-white",
  Metal: "bg-slate-400 text-slate-900",
  Fairy: "bg-pink-400 text-white",
  Dragon: "bg-indigo-600 text-white",
  Colorless: "bg-slate-200 text-slate-700",
};

export default function TypeBadge({ type }: { type: string }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${TYPE_COLORS[type] ?? "bg-slate-200 text-slate-700"}`}>
      {type}
    </span>
  );
}
