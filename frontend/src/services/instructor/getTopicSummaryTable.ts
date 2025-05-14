import api from "@/lib/axios";
import type { TopicResponse, EntryResponse } from "@/types/api";

export const getTopicSummaryTable = async () => {
  const [topicsRes, entriesRes] = await Promise.all([api.get<TopicResponse[]>('/api/v1/topics'), api.get<EntryResponse[]>('/api/v1/entries')]);

  const topics = topicsRes.data;
  const entries = entriesRes.data;

  // Count entries (replies) per topic
  const topicReplyCount: Record<number, number> = {};
  entries.forEach((entry) => {
    if (entry.entry_state === 'active') {
      topicReplyCount[entry.topic_id] = (topicReplyCount[entry.topic_id] || 0) + 1;
    }
  });

  // Return simplified topic data with reply count
  return topics.map((topic) => ({
    topic_id: topic.topic_id,
    topic_title: topic.topic_title,
    topic_posted_by_user_id: topic.topic_posted_by_user_id,
    course_id: topic.course_id,
    replies: topicReplyCount[topic.topic_id] || 0,
  }));
}
