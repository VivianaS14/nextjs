interface SeedData {
  entries: SeedEntry[];
  columns: SeedColumns;
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

interface SeedColumns {
  [key: string]: SeedColumn;
}

interface SeedColumn {
  id: number;
  title: string;
  entriesIds: string[];
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Your task should look like this. If you want state to change, try drag the note and drop in other column.",
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
