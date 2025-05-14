import api from "@/lib/axios";
import type { CourseResponse, TopicResponse, EntryResponse } from "@/types/api";

export const getEntryCountsByCourse = async() => {
  try {
    const [coursesRes, topicsRes, entriesRes] = await Promise.all([api.get<CourseResponse[]>('/api/v1/courses'), api.get<TopicResponse[]>('/api/v1/topics'), api.get<EntryResponse[]>('/api/v1/entries')]);

    const courses = coursesRes.data;
    const topics = topicsRes.data;
    const entries = entriesRes.data;

    // Map topic_id → course_id
    const topicToCourseMap: Record<number, number> = {};
    topics.forEach((t) => {
      topicToCourseMap[t.topic_id] = t.course_id;
    });

    // Count active entries by course_id
    const courseIdToEntryCount: Record<number, number> = {};
    entries.forEach((entry) => {
      if (entry.entry_state === 'active') {
        const courseId = topicToCourseMap[entry.topic_id];
        if (courseId) {
          courseIdToEntryCount[courseId] = (courseIdToEntryCount[courseId] || 0) + 1;
        }
      }
    });

    // Final result: [{ course_name, entries_count }]
    return courses.map((course) => ({
      course_name: course.course_name,
      entries_count: courseIdToEntryCount[course.course_id] || 0,
    }));
  } catch (error) {
    console.error('Failed to fetch entry counts by course', error);
    return [];
  }
}