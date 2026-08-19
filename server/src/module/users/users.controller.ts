import { Request, Response, NextFunction } from 'express';
import * as usersService from './users.service';
import { updateStatusSchema } from './users.validation';

export async function listHandler(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.json(await usersService.listUsers());
  } catch (err) {
    next(err);
  }
}

export async function getHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.json(await usersService.getUser(req.params['id'] as string));
  } catch (err) {
    next(err);
  }
}

export async function updateStatusHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = updateStatusSchema.parse(req.body);
    res.json(
      await usersService.updateUserStatus(req.params['id'] as string, input),
    );
  } catch (err) {
    next(err);
  }
}
