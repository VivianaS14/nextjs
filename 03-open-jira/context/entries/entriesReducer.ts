import { EntriesState } from ".";
import { Column, ColumnUpdate, Entry, EntryUpdate } from "@/interfaces";

type entriesActionType =
  | { type: "[Entries] Set-Entries"; payload: Entry[] }
  | { type: "[Entry] Add-Entry"; payload: Entry }
  | { type: "[Entry] Update-Entry"; payload: EntryUpdate }
  | { type: "[Column] Set-Columns"; payload: Column[] }
  | { type: "[Column] Add-EntryId"; payload: string }
  | { type: "[Column] Update-EntriesId"; payload: ColumnUpdate };

export const entriesReducer = (
  state: EntriesState,
  action: entriesActionType
) => {
  switch (action.type) {
    case "[Entry] Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case "[Entry] Update-Entry":
      const indexEntry = [...state.entries].findIndex(
        (entry) => entry._id === action.payload.entryId
      );

      state.entries[indexEntry].description = action.payload.description;
      state.entries[indexEntry].status = action.payload.status;

      return {
        ...state,
      };

    case "[Entries] Set-Entries":
      return {
        ...state,
        entries: action.payload,
      };

    case "[Column] Add-EntryId":
      const indexPendingColumn = [...state.columns].findIndex(
        (col) => col.columnId === 0
      );

      state.columns[indexPendingColumn].entriesIds = [
        action.payload,
        ...state.columns[indexPendingColumn].entriesIds,
      ];

      return {
        ...state,
      };

    case "[Column] Update-EntriesId":
      const indexColumn = [...state.columns].findIndex(
        (col) => col._id === action.payload.columnId
      );

      state.columns[indexColumn].entriesIds = [...action.payload.entriesIds];

      return {
        ...state,
      };

    case "[Column] Set-Columns":
      return {
        ...state,
        columns: action.payload,
      };

    default:
      return state;
  }
};
