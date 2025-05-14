import { IAuthService } from '../contracts/services/IAuthService';
import { IAuthsRepository } from '../contracts/repositories/IAuthsRepository';
import { LoginRequestDTO } from '../dto/LoginRequestDTO';
import { LoginResponseDTO } from '../dto/LoginResponseDTO';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error('Missing JWT_SECRET in environment variables');

type JWTPayload = {
  user_id: number;
  role: string;
};

export class AuthService implements IAuthService {
  constructor(private readonly authsRepository: IAuthsRepository) {}

  async login(request: LoginRequestDTO): Promise<{token: string, loginResponseDTO: LoginResponseDTO }> {
    const login = await this.authsRepository.getByUserId(request.user_id);

    if (!login) {
      //User not found
      throw { statusCode: 401, message: 'Authentication Fail.' };
    }

    const isPasswordValid = await bcrypt.compare(request.password, login.user_password);
    if (!isPasswordValid) {
      //Invalid password
      throw { statusCode: 401, message: 'Authentication Fail.' };
    }

    const payload: JWTPayload = { user_id: login.user_id, role: login.user_role };
    const options: jwt.SignOptions = { expiresIn: '1h' };
    const token = jwt.sign(payload, JWT_SECRET, options);

    const loginResponseDTO: LoginResponseDTO = {
      user_id: login.user_id,
      user_login_id: login.user_login_id,
      user_role: login.user_role,
    };

    return { token, loginResponseDTO };
  }
}
