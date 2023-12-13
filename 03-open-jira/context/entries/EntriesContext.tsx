import { Column, ColumnUpdate, Entry, EntryUpdate } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  entries: Entry[];
  columns: Column[];
  isUpdatingColumn: boolean;

  // Methods
  isLoadingApp: () => boolean;
  addNewEntry: (description: string) => void;
  updateColumn: (props: ColumnUpdate) => void;
  updateEntry: (props: EntryUpdate) => void;
  deleteEntry: (entryId: string, column: Column) => void;
}

export const EntriesContext = createContext({} as ContextProps);
