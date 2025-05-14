import { ICourseService } from '../contracts/services/ICourseService';
import { ICoursesRepository } from '../contracts/repositories/ICoursesRespository';
import { CourseResponseDTO } from '../dto/CourseResponseDTO';
import { excelSerialToISOString } from '../utils/dateUtils';

export class CourseService implements ICourseService {
  constructor(private readonly coursesRepository: ICoursesRepository) {}

  async getAllCourses(): Promise<CourseResponseDTO[]> {
    const rawCourses = await this.coursesRepository.getAllCourses();

    const courses: CourseResponseDTO[] = rawCourses.map((rawCourse) => ({
      course_id: rawCourse.course_id,
      semester: rawCourse.semester,
      course_code: rawCourse.course_code,
      course_name: rawCourse.course_name,
      course_created_at: excelSerialToISOString(rawCourse.course_created_at),
    }));

    return courses;
  }
}
