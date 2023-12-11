import { db } from "@/database";
import { Column, IColumn } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IColumn[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getColumns(res);

    default:
      return res.status(400).json({ message: "Endpoint invalid" });
  }
}

const getColumns = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const columns = await Column.find().sort({ columnId: "ascending" });
  await db.disconnect();

  res.status(200).json(columns);
};
