import { Entry } from "@/interfaces";
import axios from "axios";

export const jiraApi = axios.create({
  baseURL: "/api",
});

export const apiUrls = {
  entries: {
    getAll: "/entries",
    postEntry: "/entries",
    updateEntry: (entryId: string) => `/entries/${entryId}`,
  },
  columns: {
    getAll: "/columns",
    postColumn: "/columns",
    updateColumn: (columnId: string) => `/columns/${columnId}`,
  },
};
