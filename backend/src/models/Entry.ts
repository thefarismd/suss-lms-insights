export interface Entry {
  entry_id: number;
  entry_content: string;
  entry_created_at: string; // SQL-style string
  entry_deleted_at: string; // May be "NA"
  entry_state: string;
  entry_parent_id: string; // May be "NA"
  entry_posted_by_user_id: number;
  topic_id: number;
}
