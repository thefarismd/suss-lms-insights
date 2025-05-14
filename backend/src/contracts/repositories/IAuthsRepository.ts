import { Login } from "../../models/Login";

export interface IAuthsRepository {

  getAllLogins(): Promise<Login[]>;

  getByUserId(userId: number): Promise<Login | null>;
  
}

