import { compare } from "bcryptjs";
import { Middleware } from "../models/middleware.model";
import { findBy } from "../database/users";
import { User } from "../models/User";

export const requiresAuth: Middleware = () => async (
  { session },
  res,
  next
) => {
  try {
    const { username } = session;

    if (!username)
      return res.status(400).json({ message: "Invalid Credentials" });

    const user = await findBy({ username });
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    return next();
  } catch (err) {
    res.status(500).send();
  }
};
