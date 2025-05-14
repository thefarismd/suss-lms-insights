import { Topic } from "../../models/Topic";

export interface ITopicsRepository {
  getAllTopics(): Promise<Topic[]>;
}
