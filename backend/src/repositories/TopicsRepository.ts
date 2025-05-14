import path from 'path';
import { Topic } from '../models/Topic';
import { ITopicsRepository } from '../contracts/repositories/ITopicsRepository';
import { readJsonFile } from '../utils/readJsonFile';

export class TopicsRepository implements ITopicsRepository {
  // private readonly dataPath = path.join(__dirname, '../../data/topics.json');
  private readonly dataPath = path.join(process.cwd(), 'src/data/topics.json');

  async getAllTopics(): Promise<Topic[]> {
    const rawTopics = await readJsonFile<Topic[]>(this.dataPath);
    return rawTopics;
  }
}
