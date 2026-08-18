import { Request, Response, NextFunction } from 'express';
import { Permission, roleHasPermission } from '../module/auth/permissions';
import { ForbiddenError } from '../utils/appError';

export function authorize(permission: Permission) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.admin || !roleHasPermission(req.admin.role, permission)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }
    next();
  };
}
