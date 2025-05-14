import { TopicResponseDTO } from '../../dto/TopicResponseDTO';

export interface ITopicService {
  getAllTopics(): Promise<TopicResponseDTO[]>;
}
