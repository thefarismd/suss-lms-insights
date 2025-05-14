import { Router } from 'express';
import { EntryController } from '../controllers/EntryController';
import { EntryService } from '../services/EntryService';
import { EntriesRepository } from '../repositories/EntriesRepository';

const router = Router();

const entriesRepository = new EntriesRepository();
const entryService = new EntryService(entriesRepository);
const entryController = new EntryController(entryService);

router.get('/', (req, res) => entryController.getAllEntries(req, res));

export default router;
