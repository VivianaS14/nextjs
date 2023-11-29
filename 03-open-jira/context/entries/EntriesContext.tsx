import { Columns, Entry } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  entries: Entry[];
  columns: Columns;

  // Methods
  addNewEntry: (description: string) => void;
  updateEntry: (id: string, status: string) => void;
  setColumns: (
    pendingIds: string[],
    processIds: string[],
    finishedIds: string[]
  ) => void;
  setEntries: (newEntries: Entry[]) => void;
}

export const EntriesContext = createContext({} as ContextProps);
