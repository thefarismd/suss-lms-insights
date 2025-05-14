import path from 'path';
import { Login } from '../models/Login';
import { IAuthsRepository } from '../contracts/repositories/IAuthsRepository';
import { readJsonFile } from '../utils/readJsonFile';

export class AuthsRepository implements IAuthsRepository {
  // private readonly dataPath = path.join(__dirname, '../../data/login.json');
   private readonly dataPath = path.join(process.cwd(), 'src/data/login.json');

  async getAllLogins(): Promise<Login[]> {
    const rawLogins = await readJsonFile<Login[]>(this.dataPath);
    return rawLogins;
  }

  async getByUserId(userId: number): Promise<Login | null> {
    const allRawLogins = await this.getAllLogins();
    return allRawLogins.find((rawLogin) => rawLogin.user_id === userId) ?? null;
  }
}
