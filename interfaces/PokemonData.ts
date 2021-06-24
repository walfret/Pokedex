import { PokeTypes } from "./PokeTypes";
import { PokemonSprites } from "./PokemonSprites";

export interface PokemonData {
  sprites: PokemonSprites[];
  name: string;
  order: number;
  height: number;
  weight: number;
  id: number;
  types: PokeTypes[];
}
