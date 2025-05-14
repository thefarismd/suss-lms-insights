import path from 'path';
import { User } from '../models/User';
import { IUsersRepository } from '../contracts/repositories/IUsersRepository';
import { readJsonFile } from '../utils/readJsonFile';

export class UsersRepository implements IUsersRepository {
  // private readonly dataPath = path.join(__dirname, '../../data/users.json');
  private readonly dataPath = path.join(process.cwd(), 'src/data/users.json');

  async getAllUsers(): Promise<User[]> {
    const rawUsers = await readJsonFile<User[]>(this.dataPath);

    return rawUsers;
  }
}
