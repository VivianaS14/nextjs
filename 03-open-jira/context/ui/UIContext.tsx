import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  isAddingNewEntry: boolean;

  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
