export interface User {
  user_id: number;
  user_name: string;
  user_created_at: string; // SQL-style datetime
  user_deleted_at: string; // may be "NA"
  user_state: string;
}
