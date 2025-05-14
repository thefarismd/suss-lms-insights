import { Router } from 'express';
import { TopicsRepository } from '../repositories/TopicsRepository';
import { TopicService } from '../services/TopicService';
import { TopicController } from '../controllers/TopicController';

const router = Router();

const topicsRepository = new TopicsRepository();
const topicService = new TopicService(topicsRepository);
const topicController = new TopicController(topicService);


router.get('/', (req, res) => topicController.getAllTopics(req, res));

export default router;
