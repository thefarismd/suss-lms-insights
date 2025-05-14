import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UsersRepository } from '../repositories/UsersRepository';

const router = Router();

const usersRepository = new UsersRepository();
const userService = new UserService(usersRepository);
const userController = new UserController(userService); 

router.get('/', (req, res) => userController.getAllUsers(req, res));

export default router;
