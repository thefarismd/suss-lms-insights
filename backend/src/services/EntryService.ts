import { IEntryService } from '../contracts/services/IEntryService';
import { IEntriesRepository } from '../contracts/repositories/IEntriesRepository';
import { EntryResponseDTO } from '../dto/EntryResponseDTO';
import { sqlDatetimeToISOString } from '../utils/dateUtils';
import { parseNA } from '../utils/commonUtils';

export class EntryService implements IEntryService {
  constructor(private readonly entriesRepository: IEntriesRepository) {}

  async getAllEntries(): Promise<EntryResponseDTO[]> {
    
    const rawEntries = await this.entriesRepository.getAllEntries();

    const entries: EntryResponseDTO[] = rawEntries.map((rawEntry) => ({
      entry_id: rawEntry.entry_id,
      entry_content: rawEntry.entry_content,
      entry_created_at: sqlDatetimeToISOString(rawEntry.entry_created_at),
      entry_deleted_at: parseNA(rawEntry.entry_deleted_at),
      entry_state: rawEntry.entry_state,
      entry_parent_id: parseNA(rawEntry.entry_parent_id),
      entry_posted_by_user_id: rawEntry.entry_posted_by_user_id,
      topic_id: rawEntry.topic_id,
    }));

    return entries;
  }
}
