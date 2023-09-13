import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Entry } from "@/interfaces";
import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum amet corporis atque molestias sint dicta temporibus veniam quia.",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      _id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum amet corporis atque molestias sint dicta temporibus veniam quia.",
      createdAt: Date.now() - 1000000,
      status: "in-progress",
    },
    {
      _id: uuidv4(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum amet corporis atque molestias sint dicta temporibus veniam quia.",
      createdAt: Date.now() - 100000,
      status: "finished",
    },
  ],
};

export const EntriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
