import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Column, ColumnUpdate, Entry, EntryUpdate } from "@/interfaces";
import { EntriesContext, entriesReducer } from "./";
import { jiraApi } from "@/api";
import {
  useDeleteEntry,
  useGetEntries,
  useSaveEntry,
  useUpdateEntry,
} from "@/hooks/useEntries";
import { useGetColumns, useUpdateColumn } from "@/hooks/useColumns";
import { seedColumns } from "@/database";

export interface EntriesState {
  entries: Entry[];
  columns: Column[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
  columns: [],
};

export const EntriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const { data: dbEntries, isFetching: isLoadingEntries } = useGetEntries();
  const { data: dbColumns, isFetching: isLoadingColumns } = useGetColumns();

  const { mutate: addNewEntry } = useSaveEntry(
    (entry) => {
      dispatch({ type: "[Entry] Add-Entry", payload: entry });
      dispatch({ type: "[Column] Add-EntryId", payload: entry._id });

      const column = state.columns.find((col) => col.columnId === 0)!;
      fnUpdateColumn({
        columnId: column._id,
        entriesIds: [...column.entriesIds, entry._id],
      });
    },
    (error) => {
      if (error.response.status === 400) {
        const id = uuidv4();
        dispatch({
          type: "[Entry] Add-Entry",
          payload: {
            _id: id,
            createdAt: Date.now(),
            status: "Pending",
            description: JSON.parse(error.config.data).description,
          },
        });
        dispatch({ type: "[Column] Add-EntryId", payload: id });
      }
    }
  );

  const { mutate: fnUpdateColumn, isLoading: isUpdatingColumn } =
    useUpdateColumn();

  const { mutate: fnUpdateEntry } = useUpdateEntry();

  const { mutate: fnDeleteEntry } = useDeleteEntry();

  const isLoadingApp = () => {
    if (isLoadingEntries || isLoadingColumns) return true;
    return false;
  };

  const updateColumn = ({ columnId, entriesIds }: ColumnUpdate) => {
    fnUpdateColumn({
      columnId,
      entriesIds,
    });

    dispatch({
      type: "[Column] Update-EntriesId",
      payload: { columnId, entriesIds },
    });
  };

  const updateEntry = ({ description, status, entryId }: EntryUpdate) => {
    fnUpdateEntry({ description, status, entryId });

    dispatch({
      type: "[Entry] Update-Entry",
      payload: {
        entryId,
        description,
        status,
      },
    });
  };

  const deleteEntry = (entryId: string, column: Column) => {
    fnDeleteEntry(entryId);

    updateColumn({
      columnId: column._id,
      entriesIds: column.entriesIds.filter((id) => id !== entryId),
    });

    dispatch({
      type: "[Column] Update-EntriesId",
      payload: {
        columnId: column._id,
        entriesIds: column.entriesIds.filter((id) => id !== entryId),
      },
    });
  };

  useEffect(() => {
    if (dbEntries)
      dispatch({ type: "[Entries] Set-Entries", payload: dbEntries });
    if (dbColumns) {
      dispatch({ type: "[Column] Set-Columns", payload: dbColumns });
    } else {
      dispatch({
        type: "[Column] Set-Columns",
        payload: [
          {
            _id: uuidv4(),
            columnId: 0,
            title: "Pending",
            entriesIds: [],
          },
          {
            _id: uuidv4(),
            columnId: 1,
            title: "In-Progress",
            entriesIds: [],
          },
          {
            _id: uuidv4(),
            columnId: 2,
            title: "Finished",
            entriesIds: [],
          },
        ],
      });
    }
  }, [dbEntries, dbColumns]);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        isUpdatingColumn,

        // Methods
        isLoadingApp,
        addNewEntry,
        updateEntry,
        deleteEntry,
        updateColumn,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
