import { ChangeEvent, useState, useContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, TextField } from "@mui/material";
import { EntriesContext } from "@/context/entries";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);

  const [isAdding, setIsAdding] = useState(false);

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
    setIsAdding(false);
    setTouched(false);
    setEntryValue("");
  };

  return (
    <Box
      sx={{
        mb: 3,
        px: 4,
      }}
    >
      {isAdding ? (
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
          fullWidth
          onClick={() => setIsAdding(true)}
        >
          Add Pending
        </Button>
      )}
    </Box>
  );
};
