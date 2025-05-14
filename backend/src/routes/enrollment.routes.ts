import { Router } from 'express';
import { EnrollmentController } from '../controllers/EnrollmentController';
import { EnrollmentService } from '../services/EnrollmentService';
import { EnrollmentsRepository } from '../repositories/EnrollmentsRepository';

const router = Router();

const enrollmentsRepository = new EnrollmentsRepository();
const enrollmentService = new EnrollmentService(enrollmentsRepository);
const enrollmentController = new EnrollmentController(enrollmentService);

router.get('/', (req, res) => enrollmentController.getAllEnrollments(req, res));

export default router;
