import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { UnauthorizedError } from '../utils/appError';

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing access token'));
  }
  try {
    req.admin = verifyAccessToken(header.slice(7));
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired access token'));
  }
};
