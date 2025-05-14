import { Enrollment } from "../../models/Enrollment";
export interface IEnrollmentsRepository {
  getAllEnrollments(): Promise<Enrollment[]>;
}
