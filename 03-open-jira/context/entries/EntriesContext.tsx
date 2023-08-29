import { createContext } from "react";

interface ContextProps {
  entries: []; // falta el tipo de dato del arreglo
}

export const EntriesContext = createContext({} as ContextProps);
