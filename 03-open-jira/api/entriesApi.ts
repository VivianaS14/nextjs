import axios from "axios";

export const jiraApi = axios.create({
  baseURL: "/api",
});
