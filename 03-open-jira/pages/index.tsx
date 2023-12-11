import { NextPage } from "next";
import dynamic from "next/dynamic";

import { useContext, useEffect, useState } from "react";
import { Card, CardHeader, Grid } from "@mui/material";

import { Layout } from "@/components/layouts";
import { NewEntry } from "@/components/ui";
import { EntriesContext } from "@/context/entries";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column, Columns, Entry } from "@/interfaces";

const EntryList = dynamic(() => import("@/components/ui/EntryList"), {
  ssr: false,
});

const HomePage: NextPage = () => {
  const {
    entries,
    columns,
    setColumns,
    setEntries,
    updateEntry,
    refreshColumns,
  } = useContext(EntriesContext);

  console.log({ columns });

  const onDragEnd = async ({ source, destination }: DropResult) => {
    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = Object.values(columns).find(
      (col) => col.title === source.droppableId
    );
    const destinationCol: Column = columns[destination.droppableId];

    // If the user drops within the same column but in a different position
    if (source.droppableId === destination.droppableId) {
      const newEntriesIds = Array.from(sourceCol!.entriesIds);
      const [removed] = newEntriesIds.splice(source.index, 1);

      newEntriesIds.splice(destination.index, 0, removed);

      await setColumns(sourceCol!._id, newEntriesIds);
      await refreshColumns();
      return;
    }

    // If the user moves from one column to another
    // const startColIds = Array.from(sourceCol.entriesIds);
    // const [removed] = startColIds.splice(source.index, 1);
    // const [changedEntry] = entries.filter((entry) => entry._id === removed);
    // updateEntry(changedEntry._id, destination.droppableId);
    // const endColIds = Array.from(destinationCol.entriesIds);
    // endColIds.splice(destination.index, 0, removed);
    // const organizedEntries = endColIds
    //   .map((id) => entries.find((entry) => entry._id === id))
    //   .filter((entry) => entry !== undefined) as Entry[];
    // organizedEntries[destination.index] = {
    //   ...changedEntry,
    //   status: destination.droppableId,
    // };
    // const newEntries = entries.filter(
    //   (entry) => !endColIds.includes(entry._id)
    // );
    // setEntries([...newEntries, ...organizedEntries]);
    // return;
  };

  useEffect(() => {
    Object.values(columns).map(async (col) => {
      const entriesIds = entries
        .filter((entry) => entry.status === col.title)
        .map((entry) => entry._id);

      await setColumns(col._id, entriesIds);
    });
  }, []);

  return (
    <>
      <Layout title="Home - OpenJira">
        <DragDropContext onDragEnd={onDragEnd}>
          <NewEntry />
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
                    <EntryList status={col.title} order={col.entriesIds} />
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
