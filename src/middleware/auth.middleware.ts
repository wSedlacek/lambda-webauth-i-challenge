import { Middleware } from '../models/middleware.model';
import { findBy } from '../database/users';
import { compare } from 'bcryptjs';

export const requiresAuth: Middleware = () => async (req, res, next) => {
  console.log('test');
  try {
    const username = req.headers.username as string;
    const password = req.headers.password as string;

    if (!username || !password) return res.status(400).json({ message: 'Invalid Credentials' });
    const user = await findBy({ username });
    if (!user) return res.status(401).json({ message: 'Invalid Credentials' });

    const valid = await compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid Credentials' });

    return next();
  } catch (err) {
    res.status(500).send();
  }
};
