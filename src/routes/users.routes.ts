import { Router } from 'express';
import { find } from '../database/users';

export const usersRouter = Router();
usersRouter.get('/', (req, res) => {
  find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err));
});
