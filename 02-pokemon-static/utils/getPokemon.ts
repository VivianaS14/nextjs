import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

export const getPokemon = async (param: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${param}`);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
  } catch (error) {
    return null;
  }
};
