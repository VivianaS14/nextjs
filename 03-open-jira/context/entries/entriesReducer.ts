import { EntriesState } from ".";

type entriesActionType = { type: "[Entries] - ActionName" };

export const entriesReducer = (
  state: EntriesState,
  action: entriesActionType
) => {
  switch (action.type) {
    case "[Entries] - ActionName":
      return {
        ...state,
      };

    default:
      return state;
  }
};
