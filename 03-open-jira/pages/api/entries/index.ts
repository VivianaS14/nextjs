import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return await getEntries(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint invalid" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await db.disconnect();

  res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
    status: "pending",
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();

    res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);

    res.status(400).json({ message: "POST no valid" });
  }
};
