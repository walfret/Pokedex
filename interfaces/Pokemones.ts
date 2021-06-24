import { PokemonResult } from "./PokemonResult";

export interface Pokemones {
  count: number;
  next: string;
  id: number;
  previous?: string;
  results: PokemonResult[];
}
