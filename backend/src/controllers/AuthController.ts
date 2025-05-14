import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { LoginRequestDTO } from '../dto/LoginRequestDTO';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response): Promise<void> {

      const loginRequest: LoginRequestDTO = req.body;
      const { token, loginResponseDTO } = await this.authService.login(loginRequest);

      res.cookie('jwt_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      res.json({
        user_id: loginResponseDTO.user_id,
        user_login_id: loginResponseDTO.user_login_id,
        user_role: loginResponseDTO.user_role,
      });
  }

  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('jwt_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  }
}
