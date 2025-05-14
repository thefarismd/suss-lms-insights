import path from 'path';
import { Enrollment } from '../models/Enrollment';
import { IEnrollmentsRepository } from '../contracts/repositories/IEnrollmentsRepository';
import { readJsonFile } from '../utils/readJsonFile';

export class EnrollmentsRepository implements IEnrollmentsRepository {
  // private readonly dataPath = path.join(__dirname, '../../data/enrollment.json');
  private readonly dataPath = path.join(process.cwd(), 'src/data/enrollment.json');

  async getAllEnrollments(): Promise<Enrollment[]> {
    const rawEnrollments = await readJsonFile<Enrollment[]>(this.dataPath);

    return rawEnrollments;
  }
}
