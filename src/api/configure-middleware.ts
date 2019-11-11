import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';

export const configureMiddleware = (server: express.Express) => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
};
