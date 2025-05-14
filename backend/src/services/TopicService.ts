import { ITopicService } from '../contracts/services/ITopicService';
import { ITopicsRepository } from '../contracts/repositories/ITopicsRepository';
import { TopicResponseDTO } from '../dto/TopicResponseDTO';
import { sqlDatetimeToISOString } from '../utils/dateUtils';
import { parseNA } from '../utils/commonUtils';

export class TopicService implements ITopicService {
  constructor(private readonly topicsRepository: ITopicsRepository) {}

  async getAllTopics(): Promise<TopicResponseDTO[]> {
    const rawTopics = await this.topicsRepository.getAllTopics();

    const topics: TopicResponseDTO[] = rawTopics.map((rawTopic) => ({
      topic_id: rawTopic.topic_id,
      topic_title: rawTopic.topic_title,
      topic_content: rawTopic.topic_content,
      topic_created_at: sqlDatetimeToISOString(rawTopic.topic_created_at),
      topic_deleted_at: parseNA(rawTopic.topic_deleted_at),
      topic_state: rawTopic.topic_state,
      course_id: rawTopic.course_id,
      topic_posted_by_user_id: rawTopic.topic_posted_by_user_id,
    }));

    return topics;
  }
}
