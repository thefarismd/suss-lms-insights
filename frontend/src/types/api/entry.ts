export type EntryResponse = {
  entry_id: number;
  entry_content: string;
  entry_created_at: string;
  entry_deleted_at: string | null;
  entry_state: string;
  entry_parent_id: number | null;
  entry_posted_by_user_id: number;
  topic_id: number;
};
