import { Entry } from "@/interfaces";
import { FC } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  return (
    <Card
      sx={{
        marginBottom: 1,
      }} //Eventos drag
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.status}: {entry.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "end", pr: 2 }}>
          <Typography variant="body2">Hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
