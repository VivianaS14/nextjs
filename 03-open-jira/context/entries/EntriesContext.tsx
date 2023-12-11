import { Column, Columns, Entry } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  entries: Entry[];
  columns: Columns;

  // Methods
  addNewEntry: (description: string) => void;
  updateEntry: (id: string, status: string) => void;
  setColumns: (colId: string, entriesIds: string[]) => void;
  setEntries: (newEntries: Entry[]) => void;
  refreshColumns: () => void;
}

export const EntriesContext = createContext({} as ContextProps);
