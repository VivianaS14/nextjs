import { jiraApi, apiUrls } from "@/api";
import { Entry } from "@/interfaces";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { EntryUpdate } from "../interfaces/entry";

const keys = {
  getEntries: ["entries"] as const,
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

export function useSaveEntry(onSuccess: (entry: Entry) => void) {
  return useMutation({
    mutationFn: async (description: string) => {
      const { data } = await jiraApi.post<Entry>(apiUrls.entries.postEntry, {
        description,
      });
      return data;
    },
    onSuccess,
    retry: 2,
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
