import { EnrollmentResponseDTO } from '../../dto/EnrollmentResponseDTO';

export interface IEnrollmentService {
  getAllEnrollments(): Promise<EnrollmentResponseDTO[]>;
}
