import { Request, Response, NextFunction } from 'express';

type InternalAppError = {
  statusCode?: number;
  message: string;
};

export type AppErrorResponse = {
  statusCode: number;
  message: string;
  path: string;
};

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  const error: InternalAppError = {
    statusCode: 404,
    message: `Not Found - ${req.originalUrl}`,
  };
  next(error);
}

export function errorHandler(err: unknown, req: Request, res: Response<AppErrorResponse>, _next: NextFunction): void {
  const appError: InternalAppError = typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string' ? (err as InternalAppError) : { message: 'An unexpected error occurred' };

  const statusCode = typeof appError.statusCode === 'number' ? appError.statusCode : res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    statusCode,
    message: appError.message,
    path: req.originalUrl,
  });
}
