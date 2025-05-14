import { Request, Response } from 'express';
import { ITopicService } from '../contracts/services/ITopicService';

export class TopicController {
  constructor(private readonly topicService: ITopicService) {}

  async getAllTopics(req: Request, res: Response): Promise<void> {
    const topics = await this.topicService.getAllTopics();
    res.json(topics);
  }
}
