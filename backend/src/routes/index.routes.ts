import { Router } from 'express';
import entryRoutes from './entry.routes';
import courseRoutes from './course.routes';
import enrollmentRoutes from './enrollment.routes';
import topicRoutes from './topic.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

// Prefix each feature route
router.use('/auth', authRoutes);

router.use(verifyToken);
router.use('/entries', entryRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/topics', topicRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
