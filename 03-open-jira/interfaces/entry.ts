export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: string;
}

export interface EntryUpdate {
  description: string;
  status: string;
  entryId: string;
}
