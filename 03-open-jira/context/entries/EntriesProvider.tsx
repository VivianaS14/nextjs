import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Columns, Entry } from "@/interfaces";
import { EntriesContext, entriesReducer } from "./";
import { jiraApi } from "@/api";

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

  const addNewEntry = async (description: string) => {
    const { data } = await jiraApi.post<Entry>("/entries", { description });
    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async (id: string, status: string) => {
    try {
      await jiraApi.put<Entry>(`/entries/${id}`, { status });
    } catch (error) {
      console.log(error);
    }
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

  const setEntries = async (newEntries: Entry[]) => {
    dispatch({ type: "[Entries] Set-Entries", payload: newEntries });
  };

  const refreshEntries = async () => {
    const { data } = await jiraApi.get<Entry[]>("/entries");
    setEntries(data);
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        setColumns,
        setEntries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
