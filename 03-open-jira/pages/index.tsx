import { NextPage } from "next";
import dynamic from "next/dynamic";

import { useContext, useEffect, useState } from "react";
import { Card, CardHeader, CircularProgress, Grid, Stack } from "@mui/material";

import { Layout } from "@/components/layouts";
import { NewEntry } from "@/components/ui";
import { EntriesContext } from "@/context/entries";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column, Entry } from "@/interfaces";
import { useGetEntries, useUpdateEntry } from "@/hooks/useEntries";
import { useGetColumns, useUpdateColumn } from "@/hooks/useColumns";

const EntryList = dynamic(() => import("@/components/ui/EntryList"), {
  ssr: false,
});

const HomePage: NextPage = () => {
  const { entries, columns, isUpdatingColumn, updateColumn, updateEntry } =
    useContext(EntriesContext);

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

    const sourceCol: Column = columns.find(
      (col) => col.title === source.droppableId
    )!;
    const destinationCol = columns.find(
      (col) => col.title === destination.droppableId
    )!;

    // If the user drops within the same column but in a different position
    if (source.droppableId === destination.droppableId) {
      const newEntriesIds = Array.from(sourceCol!.entriesIds);
      const [removed] = newEntriesIds.splice(source.index, 1);
      newEntriesIds.splice(destination.index, 0, removed);
      sourceCol.entriesIds = newEntriesIds;

      updateColumn({
        columnId: sourceCol._id,
        entriesIds: newEntriesIds,
      });
      return;
    }

    // If the user moves from one column to another
    const startColIds = Array.from(sourceCol!.entriesIds);
    const [removed] = startColIds.splice(source.index, 1);

    updateColumn({ columnId: sourceCol._id, entriesIds: startColIds });

    const [changedEntry] = entries!.filter((entry) => entry._id === removed);
    updateEntry({
      entryId: changedEntry._id,
      status: destination.droppableId,
      description: changedEntry.description,
    });

    const endColIds = Array.from(destinationCol!.entriesIds);
    endColIds.splice(destination.index, 0, removed);

    updateColumn({ columnId: destinationCol._id, entriesIds: endColIds });

    return;
  };

  return (
    <>
      <Layout title="Home - OpenJira">
        <DragDropContext onDragEnd={onDragEnd}>
          <NewEntry />

          <Grid container spacing={4}>
            {isUpdatingColumn && (
              <Stack
                sx={{
                  height: "calc(100vh - 200px)",
                  width: "100%",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <CircularProgress />
              </Stack>
            )}
            {!isUpdatingColumn &&
              columns.map((col) => (
                <Grid item xs={12} sm={4} key={col.columnId}>
                  <Card
                    sx={{
                      height: "calc(100vh - 200px)",
                      borderRadius: 3,
                    }}
                  >
                    <CardHeader title={col.title} />
                    <EntryList column={col} />
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
