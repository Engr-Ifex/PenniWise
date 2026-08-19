import { Router } from 'express';
import {
  listHandler,
  createHandler,
  deactivateHandler,
  updateMeHandler,
  changePasswordHandler,
} from './admin-users.controller';
import { authenticate } from '../../middleware/authenticate.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { Permission } from '../auth/permissions';

export const adminUsersRouter: ReturnType<typeof Router> = Router();
adminUsersRouter.use(authenticate);

// Managing OTHER admins requires ADMINS_MANAGE (SUPER_ADMIN only)
adminUsersRouter.get('/', authorize(Permission.ADMINS_MANAGE), listHandler);
adminUsersRouter.post('/', authorize(Permission.ADMINS_MANAGE), createHandler);
adminUsersRouter.patch(
  '/:id/deactivate',
  authorize(Permission.ADMINS_MANAGE),
  deactivateHandler,
);

// Self-service — any authenticated admin manages their own account, no permission needed
adminUsersRouter.patch('/me', updateMeHandler);
adminUsersRouter.post('/me/change-password', changePasswordHandler);
