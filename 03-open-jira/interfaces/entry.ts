export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus;
}

export type EntryStatus = string;

export interface Columns {
  [key: string]: Column;
}

export interface Column {
  _id: string;
  columnId: number;
  title: string;
  entriesIds: string[];
}

export interface ColumnUpdate {
  columnId: string;
  entriesIds: string[];
}

export interface EntryUpdate {
  description: string;
  status: string;
  entryId: string;
}
