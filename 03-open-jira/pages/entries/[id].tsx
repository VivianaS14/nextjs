import { Layout } from "@/components/layouts";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getTimeAgo } from "@/utils/date";

import { useGetEntry, useUpdateEntry } from "@/hooks/useEntries";
import { useGetColumns, useUpdateColumn } from "@/hooks/useColumns";
import { Column } from "@/interfaces";
import { EntriesContext } from "@/context/entries";

export const EntryPage = () => {
  const { columns, updateColumn, updateEntry } = useContext(EntriesContext);

  const router = useRouter();

  const { data: entry } = useGetEntry(router.query.id?.toString());

  const [inputValue, setInputValue] = useState<string>("");
  const [radioValue, setRadioValue] = useState<string>("");
  const [prevColumn, setPrevColumn] = useState<string>("");

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleChangeRadioValue = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const onSave = () => {
    const columnIndex = columns.findIndex((col) => col._id === radioValue);
    const entriesIds = columns[columnIndex].entriesIds;

    if (radioValue !== prevColumn) {
      const prevColumnIndex = columns.findIndex(
        (col) => col._id === prevColumn
      );

      const prevEntriesIds = columns[prevColumnIndex].entriesIds;
      prevEntriesIds.splice(prevEntriesIds.indexOf(entry!._id), 1);

      updateColumn({ columnId: prevColumn, entriesIds: prevEntriesIds });

      updateEntry({
        description: inputValue,
        status: columns[columnIndex].title,
        entryId: entry!._id,
      });

      updateColumn({
        columnId: radioValue,
        entriesIds: [entry!._id, ...entriesIds],
      });

      router.push("/");

      return;
    }

    updateEntry({
      description: inputValue,
      status: columns[columnIndex].title,
      entryId: entry!._id,
    });

    router.push("/");
  };

  useEffect(() => {
    if (entry && columns) {
      setInputValue(entry.description.trim());

      const columnIndex = columns.findIndex(
        (col) => col.title === entry.status
      );
      setRadioValue(columns[columnIndex]._id);
      setPrevColumn(columns[columnIndex]._id);
    }
  }, [entry, columns]);

  return (
    entry && (
      <Layout title="...">
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader
                title="Entry:"
                subheader={`Created ${getTimeAgo(entry.createdAt)}`}
              />

              <CardContent>
                <TextField
                  placeholder="..."
                  fullWidth
                  autoFocus
                  multiline
                  label="Entry"
                  value={inputValue}
                  onChange={handleChangeInputValue}
                  sx={{ mt: 2, mb: 1 }}
                />

                <FormControl sx={{ mt: 2, mb: 1 }}>
                  <FormLabel id="status-buttons">Status:</FormLabel>
                  <RadioGroup
                    aria-labelledby="status-buttons"
                    name="controlled-status-buttons"
                    value={radioValue}
                    onChange={handleChangeRadioValue}
                    sx={{ display: "flex", flexDirection: "row", mt: 2 }}
                  >
                    {columns &&
                      Object.values(columns).map((column) => (
                        <FormControlLabel
                          key={column._id}
                          value={column._id}
                          control={<Radio />}
                          label={column.title}
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<SaveIcon />}
                  variant="contained"
                  sx={{}}
                  onClick={onSave}
                >
                  Save Changes
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    )
  );
};

export default EntryPage;
