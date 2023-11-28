import { EntriesState } from "@/context/entries";

import mongoose, { Model, Schema } from "mongoose";

export interface IJira extends EntriesState {}

const jiraSchema = new Schema({
  entries: [
    {
      description: { type: String, required: true },
      createdAt: { type: Number },
      status: { type: String },
    },
  ],
  columns: {
    type: Map,
    of: {
      id: { type: Number },
      title: { type: String },
      entriesIds: [String],
    },
  },
});

const JiraModel: Model<IJira> =
  mongoose.models.Jira || mongoose.model("Jira", jiraSchema);

export default JiraModel;
