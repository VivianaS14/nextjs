import { useReducer } from "react";
import { UIContext, uiReducer } from ".";

export interface UIState {
  sideMenuOpen: boolean;
  isAddingNewEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingNewEntry: false,
};

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: "UI - Open Sidebar" });

  const closeSideMenu = () => dispatch({ type: "UI - Close Sidebar" });

  const setIsAddingEntry = (isAdding: boolean) =>
    dispatch({ type: "UI - Set Adding Entry", payload: isAdding });

  return (
    <UIContext.Provider
      value={{
        ...state,

        openSideMenu,
        closeSideMenu,

        setIsAddingEntry,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
