import { UIState } from ".";

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - Set Adding Entry"; payload: boolean };

export const uiReducer = (state: UIState, action: UIActionType) => {
  switch (action.type) {
    case "UI - Open Sidebar":
      return {
        ...state,
        sideMenuOpen: true,
      };
    case "UI - Close Sidebar":
      return {
        ...state,
        sideMenuOpen: false,
      };
    case "UI - Set Adding Entry":
      return {
        ...state,
        isAddingNewEntry: action.payload,
      };

    default:
      return state;
  }
};
