import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import AppError from '../utils/appError';

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues.map((issue) => issue.message).join(', ');
        next(new AppError(message, 400));
      } else {
        next(error);
      }
    }
  };
};
