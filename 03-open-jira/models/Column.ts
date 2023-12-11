import { Column } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface IColumn extends Column {}

const columnSchema = new Schema({
  columnId: { type: Number, required: true },
  title: { type: String, required: true },
  entriesIds: [{ type: String }],
});

const ColumnModel: Model<IColumn> =
  mongoose.models.Column || mongoose.model<IColumn>("Column", columnSchema);

export default ColumnModel;
