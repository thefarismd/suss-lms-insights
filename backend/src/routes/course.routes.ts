import { Router } from 'express';
import { CourseController } from '../controllers/CourseController';
import { CourseService } from '../services/CourseService';
import { CoursesRepository } from '../repositories/CoursesRepository';

const router = Router();

const coursesRepository = new CoursesRepository();
const courseService = new CourseService(coursesRepository);
const controller = new CourseController(courseService);

router.get('/', (req, res) => controller.getAllCourses(req, res));

export default router;
