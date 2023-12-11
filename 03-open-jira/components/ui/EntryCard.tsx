import { Entry } from "@/interfaces";
import { FC } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

import { Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface Props {
  entry?: Entry;
  index: number;
}

const EntryCard: FC<Props> = ({ entry, index }) => {
  return (
    entry && (
      <Draggable draggableId={entry._id.toString()} index={index}>
        {(provided, { isDragging }) => (
          <CardActionArea sx={{ mb: 1 }}>
            <Card
              sx={{
                bgcolor: isDragging ? "#754a85" : "#59365c",
              }}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <CardContent>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {entry.description}
                </Typography>
              </CardContent>

              <CardActions
                sx={{ display: "flex", justifyContent: "space-between", pr: 2 }}
              >
                <Typography variant="subtitle2" color="#c299a0">
                  {entry.status.charAt(0).toUpperCase() +
                    entry.status.substring(1)}
                </Typography>
                <Typography variant="body2">Hace 30 minutos</Typography>
              </CardActions>
            </Card>
          </CardActionArea>
        )}
      </Draggable>
    )
  );
};

export default EntryCard;
