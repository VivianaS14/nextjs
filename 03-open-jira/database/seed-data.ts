interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedEntry[] = [
  {
    description:
      "Your task should look like this. If you want state to change, try drag the note and drop in other column.",
    createdAt: Date.now(),
    status: "pending",
  },
];
