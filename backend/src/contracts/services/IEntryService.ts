import { EntryResponseDTO } from '../../dto/EntryResponseDTO';

export interface IEntryService {
  getAllEntries(): Promise<EntryResponseDTO[]>;
}
