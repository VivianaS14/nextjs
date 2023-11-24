import { EntriesState } from ".";
import { Columns, Entry } from "@/interfaces";

type entriesActionType =
  | { type: "[Entry] Add-Entry"; payload: Entry }
  | { type: "[Column] Set-Columns"; payload: Columns }
  | { type: "[Entries] Set-Entries"; payload: Entry[] };

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

    case "[Column] Set-Columns":
      return {
        ...state,
        columns: action.payload,
      };

    case "[Entries] Set-Entries":
      return {
        ...state,
        entries: action.payload,
      };

    default:
      return state;
  }
};
