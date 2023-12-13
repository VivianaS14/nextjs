interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

interface SeedColumn {
  columnId: number;
  title: string;
  entriesIds: string[];
}

export const seedData: SeedEntry[] = [
  {
    description:
      "Your task should look like this. If you want state to change, try drag the note and drop in other column.",
    createdAt: Date.now(),
    status: "Pending",
  },
];

export const seedColumns: SeedColumn[] = [
  {
    columnId: 0,
    title: "Pending",
    entriesIds: [],
  },
  {
    columnId: 1,
    title: "In-Progress",
    entriesIds: [],
  },
  {
    columnId: 2,
    title: "Finished",
    entriesIds: [],
  },
];

export const seedJira = {
  entries: [
    {
      description: "A test",
      createdAt: Date.now(),
      status: "pending",
    },
  ],
  columns: {
    pending: {
      id: 0,
      title: "Pending",
      entriesIds: [],
    },
    "in-progress": {
      id: 1,
      title: "In-progress",
      entriesIds: [],
    },
    finished: {
      id: 2,
      title: "Finished",
      entriesIds: [],
    },
  },
};
