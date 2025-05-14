import api from '@/lib/axios';
import type { TopicResponse, UserResponse, CourseResponse, EntryResponse } from '@/types/api';

type TopicWithDetails = TopicResponse & {
  user_name: string;
  course_name: string;
};

type CourseSummary = {
  course_name: string;
  total_topics: number;
  total_entries: number;
  top_engagement_contributor: string; // by topic created
  most_active_contributor: string; // by entries (replies)
};

const getTopicsWithUserAndCourse = async (): Promise<TopicWithDetails[]> => {
  const [coursesRes, topicsRes, usersRes] = await Promise.all([api.get<CourseResponse[]>('/api/v1/courses'), api.get<TopicResponse[]>('/api/v1/topics'), api.get<UserResponse[]>('/api/v1/users')]);

  const usersMap = new Map(usersRes.data.map((user) => [user.user_id, user.user_name]));
  const coursesMap = new Map(coursesRes.data.map((course) => [course.course_id, course.course_name]));

  const topicsWithDetails: TopicWithDetails[] = topicsRes.data.map((topic) => ({
    ...topic,
    user_name: usersMap.get(topic.topic_posted_by_user_id) || 'Unknown',
    course_name: coursesMap.get(topic.course_id) || 'Unknown',
  }));

  return topicsWithDetails;
};

const getEntryCountMap = async (): Promise<Map<number, number>> => {
  const entriesRes = await api.get<EntryResponse[]>('/api/v1/entries');

  const entryCountMap = new Map<number, number>();

  entriesRes.data.forEach((entry) => {
    const count = entryCountMap.get(entry.topic_id) || 0;
    entryCountMap.set(entry.topic_id, count + 1);
  });

  return entryCountMap;
};

export const getCourseSummaries = async (): Promise<CourseSummary[]> => {
  const [topics, entryCountMap] = await Promise.all([getTopicsWithUserAndCourse(), getEntryCountMap()]);

  // Group topics by course_name
  const groupedByCourse = new Map<string, TopicWithDetails[]>();

  topics.forEach((topic) => {
    const group = groupedByCourse.get(topic.course_name) || [];
    group.push(topic);
    groupedByCourse.set(topic.course_name, group);
  });

  // Generate summary for each course
  const courseSummaries: CourseSummary[] = [];

  groupedByCourse.forEach((topicsInCourse, courseName) => {
    const topicCountPerStudent: Record<string, number> = {};
    const entryCountPerStudent: Record<string, number> = {};
    let totalTopics = 0;
    let totalEntries = 0;

    // Map for finding topic by id
    const topicIdMap = new Map(topicsInCourse.map((t) => [t.topic_id, t]));

    // Count topics per student (engagement)
    topicsInCourse.forEach((topic) => {
      totalTopics += 1;
      topicCountPerStudent[topic.user_name] = (topicCountPerStudent[topic.user_name] || 0) + 1;
      totalEntries += entryCountMap.get(topic.topic_id) || 0;
    });

    // Count entries per student (activity)
    entryCountMap.forEach((count, topicId) => {
      const topic = topicIdMap.get(topicId);
      if (topic) {
        const user = topic.user_name;
        entryCountPerStudent[user] = (entryCountPerStudent[user] || 0) + count;
      }
    });

    const topEngagementContributor = Object.entries(topicCountPerStudent).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

    const mostActiveContributor = Object.entries(entryCountPerStudent).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

    courseSummaries.push({
      course_name: courseName,
      total_topics: totalTopics,
      total_entries: totalEntries,
      top_engagement_contributor: topEngagementContributor,
      most_active_contributor: mostActiveContributor,
    });
  });

  return courseSummaries;
};
