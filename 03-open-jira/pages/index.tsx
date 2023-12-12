import { NextPage } from "next";
import dynamic from "next/dynamic";

import { useContext, useEffect, useState } from "react";
import { Card, CardHeader, Grid } from "@mui/material";

import { Layout } from "@/components/layouts";
import { NewEntry } from "@/components/ui";
import { EntriesContext } from "@/context/entries";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column, Columns, Entry } from "@/interfaces";
import { useGetEntries, useUpdateEntry } from "@/hooks/useEntries";
import { useGetColumns, useUpdateColumn } from "@/hooks/useColumns";

const EntryList = dynamic(() => import("@/components/ui/EntryList"), {
  ssr: false,
});

const HomePage: NextPage = () => {
  // const { entries, columns, setColumns, updateEntry } =
  //   useContext(EntriesContext);

  const [entries, setEntries] = useState<Entry[]>();
  const [columns, setColumns] = useState<Columns>();

  const { data: dbEntries, refetch: refetchEntries } = useGetEntries();
  const { data: dbColumns, refetch: refetchColumns } = useGetColumns();

  const { mutate: updateEntry } = useUpdateEntry();
  const { mutate: updateColumn } = useUpdateColumn();

  const onDragEnd = ({ source, destination }: DropResult) => {
    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol: Column = Object.values(columns!).find(
      (col) => col.title === source.droppableId
    )!;

    const destinationCol = Object.values(columns!).find(
      (col) => col.title === destination.droppableId
    )!;

    // If the user drops within the same column but in a different position
    if (source.droppableId === destination.droppableId) {
      const newEntriesIds = Array.from(sourceCol!.entriesIds);
      const [removed] = newEntriesIds.splice(source.index, 1);
      newEntriesIds.splice(destination.index, 0, removed);

      sourceCol.entriesIds = newEntriesIds;
      const index = Object.values(columns!).findIndex(
        (col) => col._id === sourceCol._id
      );
      setColumns({ ...columns, [index]: sourceCol });

      updateColumn({
        columnId: sourceCol._id,
        entriesIds: newEntriesIds,
      });
      return;
    }

    // If the user moves from one column to another
    const startColIds = Array.from(sourceCol!.entriesIds);
    const [removed] = startColIds.splice(source.index, 1);

    const [changedEntry] = entries!.filter((entry) => entry._id === removed);
    updateEntry({
      entryId: changedEntry._id,
      status: destination.droppableId,
      description: changedEntry.description,
    });
    changedEntry.status = destination.droppableId;
    const entryIndex = entries!.findIndex(
      (entry) => entry._id === changedEntry._id
    );
    const newEntries = [...entries!, (entries![entryIndex] = changedEntry)];
    setEntries(newEntries);

    sourceCol.entriesIds = startColIds;
    const indexSourceCol = Object.values(columns!).findIndex(
      (col) => col._id === sourceCol._id
    );
    setColumns({ ...columns, [indexSourceCol]: sourceCol });
    setTimeout(() => {
      updateColumn({ columnId: sourceCol._id, entriesIds: startColIds });
    }, 1500);

    const endColIds = Array.from(destinationCol!.entriesIds);
    endColIds.splice(destination.index, 0, removed);

    destinationCol.entriesIds = endColIds;
    const indexDestCol = Object.values(columns!).findIndex(
      (col) => col._id === destinationCol._id
    );

    setColumns({ ...columns, [indexDestCol]: destinationCol });
    setTimeout(() => {
      updateColumn({ columnId: destinationCol._id, entriesIds: endColIds });
    }, 1500);

    return;
  };

  useEffect(() => {
    if (dbColumns && dbEntries) {
      setEntries(dbEntries);
      setColumns(dbColumns);
    }
  }, [dbEntries, dbColumns]);

  return (
    <>
      <Layout title="Home - OpenJira">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns && (
            <NewEntry
              column={
                Object.values(columns).find((col) => col.title === "Pending")!
              }
              refetchColumns={refetchColumns}
              refetchEntries={refetchEntries}
            />
          )}
          <Grid container spacing={4}>
            {columns &&
              Object.values(columns).map((col) => (
                <Grid item xs={12} sm={4} key={col.columnId}>
                  <Card
                    sx={{
                      height: "calc(100vh - 200px)",
                      borderRadius: 3,
                    }}
                  >
                    <CardHeader title={col.title} />
                    <EntryList
                      status={col.title}
                      order={col.entriesIds}
                      entries={entries}
                    />
                  </Card>
                </Grid>
              ))}
          </Grid>
        </DragDropContext>
      </Layout>
    </>
  );
};

export default HomePage;
