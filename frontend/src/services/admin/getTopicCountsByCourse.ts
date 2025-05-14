import api from "@/lib/axios";
import type { CourseResponse, TopicResponse } from "@/types/api";

export const getTopicCountsByCourse = async () => {
  try {
    const [coursesRes, topicsRes] = await Promise.all([api.get<CourseResponse[]>('/api/v1/courses'), api.get<TopicResponse[]>('/api/v1/topics')]);

    const courses = coursesRes.data;
    const topics = topicsRes.data;

    const courseIdToTopicCount: Record<number, number> = {};

    topics.forEach((topic) => {
      if (topic.topic_state === 'active') {
        courseIdToTopicCount[topic.course_id] = (courseIdToTopicCount[topic.course_id] || 0) + 1;
      }
    });

    return courses.map((course) => ({
      course_name: course.course_name,
      topics_count: courseIdToTopicCount[course.course_id] || 0,
    }));
  } catch (error) {
    console.error('Failed to fetch topic counts by course', error);
    return [];
  }
}
