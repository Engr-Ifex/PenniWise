import { Router } from 'express';
import {
  listHandler,
  getHandler,
  updateStatusHandler,
} from './users.controller';
import { authenticate } from '../../middleware/authenticate.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { Permission } from '../auth/permissions';

export const usersRouter: ReturnType<typeof Router> = Router();
usersRouter.use(authenticate);

usersRouter.get('/', authorize(Permission.USERS_READ), listHandler);
usersRouter.get('/:id', authorize(Permission.USERS_READ), getHandler);
usersRouter.patch(
  '/:id/status',
  authorize(Permission.USERS_WRITE),
  updateStatusHandler,
);
