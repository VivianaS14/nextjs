import { apiUrls, jiraApi } from "@/api";
import { Column, ColumnUpdate, Columns } from "@/interfaces";
import { useMutation, useQuery } from "react-query";

const keys = {
  getColumns: ["columns"] as const,
} as const;

export function useGetColumns() {
  return useQuery({
    queryFn: async (): Promise<Columns> => {
      const { data } = await jiraApi.get<Columns>(apiUrls.columns.getAll);
      return data;
    },
    queryKey: keys.getColumns,
    refetchOnWindowFocus: false,
  });
}

export function useUpdateColumn() {
  return useMutation({
    mutationFn: async ({ columnId, entriesIds }: ColumnUpdate) => {
      const { data } = await jiraApi.put<Column>(
        apiUrls.columns.updateColumn(columnId),
        {
          entriesIds,
        }
      );
      return data;
    },
    retry: 3,
  });
}
