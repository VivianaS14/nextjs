import { FC } from "react";
import { useRouter } from "next/router";

import { Grid, Card } from "@nextui-org/react";

interface Props {
  id: number;
}

const FavoriteCardPokemon: FC<Props> = ({ id }) => {
  const routes = useRouter();

  const onFavoriteClick = () => {
    routes.push(`/pokemon/${id}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} lg={1} key={id}>
      <Card
        hoverable
        clickable
        css={{
          padding: 10,
        }}
        onClick={onFavoriteClick}
      >
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width={"100%"}
          height={140}
        />
      </Card>
    </Grid>
  );
};

export default FavoriteCardPokemon;
