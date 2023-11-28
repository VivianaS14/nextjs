import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Columns, Entry } from "@/interfaces";
import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
  columns: Columns;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
  columns: {
    pending: {
      id: 0,
      title: "Pending",
      entriesIds: [],
    },
    "in-progress": {
      id: 1,
      title: "In-progress",
      entriesIds: [],
    },
    finished: {
      id: 2,
      title: "Finished",
      entriesIds: [],
    },
  },
};

export const EntriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };
    dispatch({ type: "[Entry] Add-Entry", payload: newEntry });
  };

  const setColumns = (
    pendingIds: string[],
    processIds: string[],
    finishedIds: string[]
  ) => {
    const newColumns = {
      pending: {
        ...state.columns.pending,
        entriesIds: pendingIds,
      },
      "in-progress": {
        ...state.columns["in-progress"],
        entriesIds: processIds,
      },
      finished: {
        ...state.columns.finished,
        entriesIds: finishedIds,
      },
    };

    dispatch({ type: "[Column] Set-Columns", payload: newColumns });
  };

  const setEntries = (newEntries: Entry[]) => {
    dispatch({ type: "[Entries] Set-Entries", payload: newEntries });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        setColumns,
        setEntries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
