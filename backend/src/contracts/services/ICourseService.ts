import { CourseResponseDTO } from '../../dto/CourseResponseDTO';

export interface ICourseService {
  getAllCourses(): Promise<CourseResponseDTO[]>;
}
