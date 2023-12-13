import { db, seedData, seedColumns, seedJira } from "@/database";
import { Entry, Column, Jira } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "Access invalid to data base" });
  }

  await db.connect();

  // Peticiones a la base de datos
  // await Jira.deleteMany();
  // await Jira.insertMany(seedJira);

  await Entry.deleteMany();
  // await Entry.insertMany(seedData);

  await Column.deleteMany();
  await Column.insertMany(seedColumns);

  await db.disconnect();

  res.status(200).json({ message: "Done" });
}
