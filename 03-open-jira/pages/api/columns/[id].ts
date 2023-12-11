import { db } from "@/database";
import { Column, IColumn } from "@/models";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IColumn;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Bad Request to endpoint" });
  }

  switch (req.method) {
    case "PUT":
      return updateColumn(req, res);

    default:
      return res.status(400).json({ message: "Method does not exist" });
  }
}

const updateColumn = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();
  const columnToUpdate = await Column.findById(id);

  if (!columnToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There's no data match the criteria" + id });
  }

  const { entriesIds } = req.body;

  console.log({ id, entriesIds });

  try {
    const updatedColumn = await Column.findByIdAndUpdate(
      id,
      { entriesIds },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedColumn!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: "Bad request" });
  }
};
