import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import logger from '../config/logger';

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error('SERVER ERROR:', err);
  logger.error(err);

  if (err instanceof AppError) {
    const response: Record<string, unknown> = {
      status: err.status,
      message: err.message,
    };

    if (err.errors && err.errors.length > 0) {
      response['errors'] = err.errors;
    }

    return res.status(err.statusCode).json(response);
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
