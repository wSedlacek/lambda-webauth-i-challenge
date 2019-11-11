import { Router } from 'express';

import { authRouter } from '../routes/auth.routes';
import { usersRouter } from '../routes/users.routes';
import { requiresAuth } from '../middleware/auth.middleware';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/restricted', requiresAuth());
apiRouter.use('/restricted/users', usersRouter);
