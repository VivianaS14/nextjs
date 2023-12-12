import { FC, useContext, useMemo } from "react";
import dynamic from "next/dynamic";

import { List, Paper, Stack } from "@mui/material";

import { EntriesContext } from "@/context/entries";
import { Entry, EntryStatus } from "@/interfaces";

import { Droppable } from "react-beautiful-dnd";

const EntryCard = dynamic(() => import("@/components/ui/EntryCard"), {
  ssr: false,
});

interface Props {
  status: string;
  order: string[];
  entries?: Entry[];
}

const EntryList: FC<Props> = ({ status, order, entries }) => {
  // const { entries } = useContext(EntriesContext);

  // Solamente se debe ejecutar cuando las entries cambien
  const entriesByStatus = useMemo(
    () =>
      order
        .map((id) => entries?.find((entry) => entry._id === id))
        .filter(Boolean),
    [entries, order]
  );

  return (
    entries && (
      <Droppable droppableId={status}>
        {(provided, { isDraggingOver }) => (
          <Stack
            sx={{
              height: "calc(100vh - 250px)",
              overflow: "auto",
              p: "2px 5px",
              bgcolor: isDraggingOver ? "#474546" : "transparent",
              borderRadius: 2,
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <List sx={{ opacity: 1 }}>
              {entriesByStatus.map((entry, index) => (
                <EntryCard key={entry?._id} entry={entry} index={index} />
              ))}
              {provided.placeholder}
            </List>
          </Stack>
        )}
      </Droppable>
    )
  );
};

export default EntryList;
