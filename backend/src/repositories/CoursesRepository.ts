import path from 'path';
import { ICoursesRepository } from '../contracts/repositories/ICoursesRespository';
import { Course } from '../models/Course';
import { readJsonFile } from '../utils/readJsonFile';

export class CoursesRepository implements ICoursesRepository {
  // private readonly dataPath = path.join(__dirname, '../../data/courses.json');
  private readonly dataPath = path.join(process.cwd(), 'src/data/courses.json');

  async getAllCourses(): Promise<Course[]> {
    const rawCourses = await readJsonFile<Course[]>(this.dataPath);
    return rawCourses;
  }
}


