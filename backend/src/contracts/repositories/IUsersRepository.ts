import { User } from "../../models/User";

export interface IUsersRepository {
  getAllUsers(): Promise<User[]>;
}
