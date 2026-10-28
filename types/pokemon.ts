// Tipagem do retorno da API Pokémon TCG (base: interface do professor)

export interface ResponsePokemonList {
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
  data: Pokemon[];
}

export interface ResponsePokemonDetail {
  data: Pokemon;
}

// Campos usados na listagem / salvos nos favoritos
export interface PokemonSummary {
  id: string;
  name: string;
  hp?: string; // treinadores e energias não têm hp
  types?: string[];
  nationalPokedexNumbers?: number[];
  images: Images;
}

// Carta completa (página de detalhes)
export interface Pokemon extends PokemonSummary {
  supertype: string;
  subtypes?: string[];
  level?: string;
  evolvesFrom?: string;
  flavorText?: string;
  abilities?: Ability[];
  attacks?: Attack[];
  weaknesses?: Weakness[];
  resistances?: Resistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: Set;
  number: string;
  artist?: string;
  rarity?: string;
  legalities?: Legalities;
  tcgplayer?: Tcgplayer;
}

export interface Ability {
  name: string;
  text: string;
  type: string;
}

export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface Weakness {
  type: string;
  value: string;
}

export type Resistance = Weakness;

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  releaseDate: string;
  images: { symbol: string; logo: string };
}

export interface Legalities {
  unlimited?: string;
  standard?: string;
  expanded?: string;
}

export interface Images {
  small: string;
  large: string;
}

export interface PriceRange {
  low?: number | null;
  mid?: number | null;
  high?: number | null;
  market?: number | null;
}

export interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices?: Record<string, PriceRange>;
}
