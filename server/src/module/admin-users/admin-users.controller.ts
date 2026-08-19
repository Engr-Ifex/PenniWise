import { Request, Response, NextFunction } from 'express';
import * as adminUsersService from './admin-users.service';
import {
  createAdminSchema,
  updateAccountSchema,
  changePasswordSchema,
} from './admin-users.validation';

export async function listHandler(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.json(await adminUsersService.listAdmins());
  } catch (err) {
    next(err);
  }
}

export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = createAdminSchema.parse(req.body);
    res.status(201).json(await adminUsersService.createAdmin(input));
  } catch (err) {
    next(err);
  }
}

export async function deactivateHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await adminUsersService.deactivateAdmin(req.params['id'] as string);
    res.json({ message: 'Admin deactivated' });
  } catch (err) {
    next(err);
  }
}

// Self-service — updates only ever apply to req.admin.sub, never :id from the URL.
export async function updateMeHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = updateAccountSchema.parse(req.body);
    res.json(await adminUsersService.updateAccount(req.admin!.sub, input));
  } catch (err) {
    next(err);
  }
}

export async function changePasswordHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = changePasswordSchema.parse(req.body);
    await adminUsersService.changePassword(req.admin!.sub, input);
    res.json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
}
