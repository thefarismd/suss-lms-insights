import { Course } from "../../models/Course";

export interface ICoursesRepository {
  getAllCourses(): Promise<Course[]>;
}
