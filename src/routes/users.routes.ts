import { Router } from "express";
import { find } from "../database/users";

export const usersRouter = Router();
usersRouter.get("/", async (req, res) => {
  try {
    const users = await find();
    res.json(users);
  } catch (err) {
    res.send(err);
  }
});
