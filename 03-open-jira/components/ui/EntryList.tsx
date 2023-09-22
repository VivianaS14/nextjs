import { FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntriesContext } from "@/context/entries";
import { EntryStatus } from "@/interfaces";
import { EntryCard } from ".";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  // Solamente se debe ejecutar cuando las entries cambien
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries]
  );

  return (
    // TODO: haremos drop
    <div>
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          bgcolor: "transparent",
          p: "2px 5px",
        }}
      >
        {/* TODO: cambiar si hace drag */}
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
