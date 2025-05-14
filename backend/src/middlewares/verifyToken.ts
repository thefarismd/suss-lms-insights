import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error('Missing JWT_SECRET in environment variables');

interface JWTPayload {
  user_id: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export function verifyToken(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.jwt_token;
  //console.log('🔐 Token received:', token);

  if (!token) {
    return next({ statusCode: 401, message: 'Unauthorized: Missing token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.user = decoded;
    next(); 
  } catch (error) {
    return next({ statusCode: 403, message: 'Invalid or expired token' });
  }
}
