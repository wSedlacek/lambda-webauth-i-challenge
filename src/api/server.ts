import * as express from 'express';

import { apiRouter } from './api-router';
import { configureMiddleware } from './configure-middleware';

export const server = express();

configureMiddleware(server);
server.use('/api', apiRouter);
