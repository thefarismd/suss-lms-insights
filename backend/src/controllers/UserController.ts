import { Request, Response } from 'express';
import { IUserService } from '../contracts/services/IUserService';

export class UserController {
  constructor(private readonly userService: IUserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }
}