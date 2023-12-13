import { jiraApi, apiUrls } from "@/api";
import { Entry } from "@/interfaces";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { EntryUpdate } from "../interfaces/entry";

const keys = {
  getEntries: ["entries"] as const,
  getEntry: (entryId?: string) => ["entry", entryId],
} as const;

export function useGetEntries() {
  return useQuery({
    queryFn: async (): Promise<Entry[]> => {
      const { data } = await jiraApi.get<Entry[]>(apiUrls.entries.getAll);
      return data;
    },
    queryKey: keys.getEntries,
  });
}

export function useSaveEntry(
  onSuccess: (entry: Entry) => void,
  onError: (error: any) => void
) {
  return useMutation({
    mutationFn: async (description: string) => {
      const { data } = await jiraApi.post<Entry>(apiUrls.entries.postEntry, {
        description,
      });
      return data;
    },
    onSuccess,
    onError,
  });
}

export function useUpdateEntry() {
  return useMutation({
    mutationFn: async ({ description, status, entryId }: EntryUpdate) => {
      const { data } = await jiraApi.put<Entry>(
        apiUrls.entries.updateEntry(entryId),
        { status, description }
      );
      return data;
    },
  });
}

export function useGetEntry(entryId?: string) {
  return useQuery({
    enabled: Boolean(entryId),
    queryFn: async (): Promise<Entry> => {
      if (!entryId) throw new Error("Invalid id");
      const { data } = await jiraApi.get<Entry>(
        apiUrls.entries.getEntry(entryId)
      );
      return data;
    },
    queryKey: keys.getEntry(entryId),
  });
}

export function useDeleteEntry() {
  return useMutation({
    mutationFn: async (entryId: string) => {
      const { data } = await jiraApi.delete(
        apiUrls.entries.deleteEntry(entryId)
      );
      return data;
    },
  });
}
