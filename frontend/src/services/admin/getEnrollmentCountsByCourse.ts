import api from "@/lib/axios";
import type { CourseResponse, EnrollmentResponse } from "@/types/api";

export const getEnrollmentCountsByCourse = async () => {
  // TODO TRY CATCH BLOCK
  const [coursesRes, enrollmentsRes] = await Promise.all([api.get<CourseResponse[]>('/api/v1/courses'), api.get<EnrollmentResponse[]>('/api/v1/enrollments')]);

  const courses = coursesRes.data;
  const enrollments = enrollmentsRes.data;

  const courseIdToCount: Record<number, number> = {};

  enrollments.forEach((e) => {
    if (e.enrollment_type === 'student' && e.enrollment_state === 'active') {
      courseIdToCount[e.course_id] = (courseIdToCount[e.course_id] || 0) + 1;
    }
  });

  return courses.map((course) => ({
    course_name: course.course_name,
    student_count: courseIdToCount[course.course_id] || 0,
  }));
};
