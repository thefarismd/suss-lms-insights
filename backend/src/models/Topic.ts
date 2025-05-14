export interface Topic {
  topic_id: number;
  topic_title: string;
  topic_content: string;
  topic_created_at: string; // SQL-style string
  topic_deleted_at: string; // may be "NA"
  topic_state: string;
  course_id: number;
  topic_posted_by_user_id: number;
}
