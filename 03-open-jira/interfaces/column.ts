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
