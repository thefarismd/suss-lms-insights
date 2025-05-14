export interface EntryResponseDTO {
  entry_id: number;
  entry_content: string;
  entry_created_at: string; // ISO string
  entry_deleted_at: string | null;
  entry_state: string;
  entry_parent_id: string | null;
  entry_posted_by_user_id: number;
  topic_id: number;
}


