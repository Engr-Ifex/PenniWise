import { Router } from 'express';
import {
  loginHandler,
  refreshHandler,
  logoutHandler,
  logoutAllHandler,
} from './auth.controller';
import { authenticate } from '../../middleware/authenticate.middleware';

export const authRouter: ReturnType<typeof Router> = Router();

authRouter.post('/login', loginHandler);
authRouter.post('/refresh', refreshHandler);
authRouter.post('/logout', authenticate, logoutHandler);
authRouter.post('/logout-all', authenticate, logoutAllHandler);
