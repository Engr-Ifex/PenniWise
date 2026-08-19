import { Request, Response, NextFunction } from 'express';
import * as sessionsService from './sessions.service';

export async function listHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.json(await sessionsService.listSessions(req.admin!.sub));
  } catch (err) {
    next(err);
  }
}

export async function revokeHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await sessionsService.revokeSession(
      req.admin!.sub,
      req.params['id'] as string,
    );
    res.json({ message: 'Session revoked' });
  } catch (err) {
    next(err);
  }
}
