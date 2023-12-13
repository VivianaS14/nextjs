import {
  ChangeEvent,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, TextField } from "@mui/material";
import { useSaveEntry } from "@/hooks/useEntries";
import { useUpdateColumn } from "@/hooks/useColumns";
import { Column, Entry } from "@/interfaces";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingNewEntry, setIsAddingEntry } = useContext(UIContext);

  const [entryValue, setEntryValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onEntryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setEntryValue(event.target.value);
  };

  const onSave = () => {
    if (entryValue.trim() === "") return;

    addNewEntry(entryValue);
    onCancel();
  };

  const onCancel = () => {
    setIsAddingEntry(false);
    setTouched(false);
    setEntryValue("");
  };

  return (
    <Box
      sx={{
        mt: 2,
        mb: 4,
        px: 4,
      }}
    >
      {isAddingNewEntry ? (
        <>
          <TextField
            label="New Entry"
            value={entryValue}
            onChange={onEntryChanged}
            onBlur={() => setTouched(true)}
            helperText={
              entryValue.length <= 0 && touched && "Insert a new value"
            }
            error={entryValue.length <= 0 && touched}
            sx={{ mt: 2, mb: 1 }}
            fullWidth
            autoFocus
            multiline
          />

          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<SaveIcon />}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="outlined"
          startIcon={<AddCircleIcon />}
          onClick={() => setIsAddingEntry(true)}
          color="secondary"
        >
          Add Pending
        </Button>
      )}
    </Box>
  );
};
