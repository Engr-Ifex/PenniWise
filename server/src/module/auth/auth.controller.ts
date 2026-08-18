import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.servive';
import { loginSchema, refreshSchema } from './auth.validation';

export async function loginHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = loginSchema.parse(req.body);
    const result = await authService.login(input, {
      ...(req.headers['user-agent'] !== undefined && {
        userAgent: req.headers['user-agent'],
      }),
      ...(req.ip !== undefined && { ipAddress: req.ip }),
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function refreshHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    const result = await authService.refresh(refreshToken);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function logoutHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await authService.logout(req.admin!.sid);
    res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
}

export async function logoutAllHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await authService.logoutAllDevices(req.admin!.sub);
    res.status(200).json({ message: 'Logged out of all devices' });
  } catch (err) {
    next(err);
  }
}
