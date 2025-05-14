import { LoginRequestDTO } from '../../dto/LoginRequestDTO';
import { LoginResponseDTO } from '../../dto/LoginResponseDTO';


export interface IAuthService {
  login(request: LoginRequestDTO): Promise<{ token: string, loginResponseDTO: LoginResponseDTO }>;

}
