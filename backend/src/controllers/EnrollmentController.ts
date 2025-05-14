import { Request, Response } from 'express';
import { IEnrollmentService } from '../contracts/services/IEnrollmentService';

export class EnrollmentController {
    
  constructor(private readonly enrollmentService: IEnrollmentService) {}

  async getAllEnrollments(req: Request, res: Response): Promise<void> {
    const enrollments = await this.enrollmentService.getAllEnrollments();
    res.json(enrollments);
  }
}
