import { Request, Response } from 'express';
import { ICourseService } from '../contracts/services/ICourseService';

export class CourseController {
  constructor(private readonly courseService: ICourseService) {}

  async getAllCourses(req: Request, res: Response): Promise<void> {
    const courses = await this.courseService.getAllCourses();
    res.json(courses);
  }
}
