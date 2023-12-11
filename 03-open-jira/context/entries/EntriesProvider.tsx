import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Column, Columns, Entry } from "@/interfaces";
import { EntriesContext, entriesReducer } from "./";
import { jiraApi } from "@/api";

export interface EntriesState {
  entries: Entry[];
  columns: Columns;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
  columns: {},
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

  const setColumns = async (colId: string, entriesIds: string[]) => {
    const index = Object.values(state.columns).findIndex(
      (c: Column) => c._id === colId
    );

    const cols: Columns = {
      ...state.columns,
      [index]: { ...state.columns[index], entriesIds },
    };

    dispatch({ type: "[Column] Set-Columns", payload: cols });

    try {
      await jiraApi.put<Column>(`/columns/${colId}`, {
        entriesIds,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setEntries = async (newEntries: Entry[]) => {
    dispatch({ type: "[Entries] Set-Entries", payload: newEntries });
  };

  const refreshEntries = async () => {
    const { data } = await jiraApi.get<Entry[]>("/entries");
    setEntries(data);
  };

  const refreshColumns = async () => {
    const { data } = await jiraApi.get<Columns>("/columns");
    dispatch({ type: "[Column] Set-Columns", payload: data });
  };

  useEffect(() => {
    refreshEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.entries.length > 0) {
      refreshColumns();
    }
  }, [state.entries]);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        setColumns,
        setEntries,
        refreshColumns,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
