import { Request, Response } from 'express';
import { IEntryService } from '../contracts/services/IEntryService';

export class EntryController {

    constructor(private readonly entryService: IEntryService){};

    async getAllEntries(req: Request, res: Response) : Promise<void>{
        const entries = await this.entryService.getAllEntries();
        res.json(entries);
    }
}