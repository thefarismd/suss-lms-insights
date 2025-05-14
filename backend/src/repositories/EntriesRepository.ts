import path from 'path';
import { Entry } from '../models/Entry';
import { IEntriesRepository } from '../contracts/repositories/IEntriesRepository';
import { readJsonFile } from '../utils/readJsonFile';

export class EntriesRepository implements IEntriesRepository {
  // private readonly dataPath = path.join(__dirname, '../../data/entries.json');
  private readonly dataPath = path.join(process.cwd(), 'src/data/entries.json');

  async getAllEntries(): Promise<Entry[]> {
    const rawEntries = await readJsonFile<Entry[]>(this.dataPath);

    // const entries: EntryDTO[] = raw.map((entry) => ({
    //   ...entry,
    //   entry_created_at: sqlDatetimeToISOString(entry.entry_created_at),
    //   entry_deleted_at: parseNA(entry.entry_deleted_at),
    //   entry_parent_id: parseNA(entry.entry_parent_id),
    // }));

    return rawEntries;
  }
}
