import { IUserService } from '../contracts/services/IUserService';
import { IUsersRepository } from '../contracts/repositories/IUsersRepository';
import { UserResponseDTO } from '../dto/UserResponseDTO';
import { sqlDatetimeToISOString } from '../utils/dateUtils';
import { parseNA } from '../utils/commonUtils';

export class UserService implements IUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const rawUsers = await this.usersRepository.getAllUsers();

    const users: UserResponseDTO[] = rawUsers.map((rawUser) => ({
      user_id: rawUser.user_id,
      user_name: rawUser.user_name,
      user_created_at: sqlDatetimeToISOString(rawUser.user_created_at),
      user_deleted_at: parseNA(rawUser.user_deleted_at),
      user_state: rawUser.user_state,
    }));

    return users;
  }
}
