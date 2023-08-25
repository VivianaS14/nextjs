import { useEffect, useState } from "react";

import { Layout } from "@/components/Layouts";
import NoFavorites from "@/components/ui/NoFavorites";
import FavoritesPokemons from "@/components/pokemon/FavoritesPokemons";
import { localFavorites } from "@/utils";

const FavoritesPage = () => {
  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons);
  }, []);

  return (
    <Layout title="Favorites">
      {favoritesPokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritesPokemons pokemons={favoritesPokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
