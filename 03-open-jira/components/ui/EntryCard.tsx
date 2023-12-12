import { Column, Entry } from "@/interfaces";

import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  DeleteForever as DeleteIcon,
} from "@mui/icons-material";

import { getTimeAgo } from "@/utils/date";
import { useRouter } from "next/router";
import { useDeleteEntry } from "@/hooks/useEntries";
import { useGetColumns, useUpdateColumn } from "@/hooks/useColumns";

interface Props {
  entry?: Entry;
  index: number;
  column: Column;
}

const EntryCard: FC<Props> = ({ entry, index, column }) => {
  const router = useRouter();

  const { mutate: deleteEntry } = useDeleteEntry();
  const { mutate: updateColumn } = useUpdateColumn();
  const { refetch: refetchColumns } = useGetColumns();

  const onEdit = () => {
    router.push(`/entries/${entry!._id}`);
  };

  const onDelete = () => {
    deleteEntry(entry!._id);

    setTimeout(() => {
      updateColumn({
        columnId: column._id,
        entriesIds: column.entriesIds.filter((id) => id !== entry!._id),
      });
    }, 1500);

    setTimeout(() => {
      refetchColumns();
    }, 1500);
  };

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
                <Typography variant="subtitle2" color="#c299a0" mb={1}>
                  {entry.status}
                </Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {entry.description}
                </Typography>
              </CardContent>

              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="body2" color="#c299a0">
                  {getTimeAgo(entry.createdAt)}
                </Typography>
                <Stack direction="row">
                  <Tooltip title="Edit">
                    <IconButton aria-label="Edit" size="small" onClick={onEdit}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="Delete"
                      size="small"
                      onClick={onDelete}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </CardActions>
            </Card>
          </CardActionArea>
        )}
      </Draggable>
    )
  );
};

export default EntryCard;
