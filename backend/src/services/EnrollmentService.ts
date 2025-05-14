import { IEnrollmentService } from '../contracts/services/IEnrollmentService';
import { IEnrollmentsRepository } from '../contracts/repositories/IEnrollmentsRepository';
import { EnrollmentResponseDTO } from '../dto/EnrollmentResponseDTO';

export class EnrollmentService implements IEnrollmentService {

  constructor(private readonly enrollmentsRepository: IEnrollmentsRepository) {}

  async getAllEnrollments(): Promise<EnrollmentResponseDTO[]> {
    const rawEnrollments = await this.enrollmentsRepository.getAllEnrollments();

    const enrollments: EnrollmentResponseDTO[] = rawEnrollments.map((rawEnrollment) => ({
      user_id: rawEnrollment.user_id,
      course_id: rawEnrollment.course_id,
      enrollment_type: rawEnrollment.enrollment_type,
      enrollment_state: rawEnrollment.enrollment_state,
    }));

    return enrollments;
  }
}

