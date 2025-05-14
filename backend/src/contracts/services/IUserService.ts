import { UserResponseDTO } from '../../dto/UserResponseDTO';

export interface IUserService {
  getAllUsers(): Promise<UserResponseDTO[]>;
}
