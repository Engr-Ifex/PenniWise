import { Router } from 'express';
import { listHandler, revokeHandler } from './sessions.controller';
import { authenticate } from '../../middleware/authenticate.middleware';

export const sessionsRouter: ReturnType<typeof Router> = Router();
sessionsRouter.use(authenticate);

sessionsRouter.get('/', listHandler);
sessionsRouter.delete('/:id', revokeHandler);
