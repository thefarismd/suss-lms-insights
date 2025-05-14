import { Entry } from "../../models/Entry";

export interface IEntriesRepository {
  getAllEntries(): Promise<Entry[]>;
}
