import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { AuthsRepository } from '../repositories/AuthsRepository';
import { wrapAsync } from '../utils/wrapAsync';

const router = Router();

const authsRepository = new AuthsRepository();
const authService = new AuthService(authsRepository);
const authController = new AuthController(authService);

router.post('/login', wrapAsync((req, res) => authController.login(req, res)));
router.post('/logout', (req, res) => authController.logout(req, res));

export default router;
