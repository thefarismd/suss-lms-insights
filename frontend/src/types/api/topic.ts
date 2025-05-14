export type TopicResponse = {
  topic_id: number;
  topic_title: string;
  topic_content: string;
  topic_created_at: string;
  topic_deleted_at: string | null;
  topic_state: string;
  course_id: number;
  topic_posted_by_user_id: number;
};
