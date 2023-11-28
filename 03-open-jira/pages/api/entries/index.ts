import { db } from "@/database";
import { Entry } from "@/interfaces";
import { IJira, Jira } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | Entry[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    default:
      return res.status(400).json({ message: "Endpoint invalid" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Jira.find();
  await db.disconnect();

  res.status(200).json(entries[0].entries);
};
